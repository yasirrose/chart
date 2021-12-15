import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Doughnut, Pie } from "react-chartjs-2";
import { chartColors } from "./colors";

import "./styles.css";

const options = {
  legend: {
    display: false,
    position: "right"
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  }
};

const pieOptions = {
  legend: {
    display: false,
    position: "right",
    onClick: function(e, legendItem) {
      // Works on only default legend -> Code written to understand Legend Toggle [set display: true]

      // Get the dataset we want to toggle visibility of
      var index = legendItem.index;

      // Get chart context
      const ctx = chartInstance.chartInstance;
      const meta = ctx.getDatasetMeta(0);

      // See controller.isDatasetVisible comment
      meta.data[index].hidden = !meta.data[index].hidden;

      // Get the chart to update with updated legend
      ctx.update();
    },
    legendCallback: function(chart) {
      var ul = document.createElement("ul");
      chart.data.datasets.forEach(function(dataset, datasetIndex) {
        let backgroundColor = dataset.backgroundColor;
        dataset.labels.forEach(function(label, labelIndex) {
          ul.innerHTML += `
                  <li>
                     <span style="background-color: ${
                       backgroundColor[labelIndex]
                     }"></span>
                      ${label}
                   </li>
                `;
        });
      });
      return ul.outerHTML;
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }
};

const data = {
  maintainAspectRatio: false,
  responsive: false,
  labels: ["a", "b", "c", "d"],
  datasets: [
    {
      data: [300, 50, 100, 50],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors
    }
  ]
};

const pieData = {
  maintainAspectRatio: false,
  responsive: false,
  labels: ["usa", "europe", "africa"],
  datasets: [
    {
      data: [200, 150, 20, 10],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors
    }
  ]
};

let chartInstance = null;
function App() {
  const handleClick = (e, index) => {
    const ctx = chartInstance.chartInstance;
    const meta = ctx.getDatasetMeta(0);

    // See controller.isDatasetVisible comment
    meta.data[index].hidden = !meta.data[index].hidden;

    // Toggle strikethrough class
    if (e.currentTarget.classList.contains("disable-legend")) {
      e.currentTarget.classList.remove("disable-legend");
    } else {
      e.currentTarget.classList.add("disable-legend");
    }
    chartInstance.chartInstance.update();
  };

  useEffect(() => {
    const legend = chartInstance.chartInstance.generateLegend();

    document.getElementById("legend").innerHTML = legend;

    document.querySelectorAll("#legend li").forEach((item, index) => {
      item.addEventListener("click", e => handleClick(e, index));
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div style={styles.relative}>
        {/* <Doughnut data={data} options={options} /> */}
        <div style={styles.pieContainer}>
          <Pie
            data={data}
            options={pieOptions}
            ref={input => {
              chartInstance = input;
            }}
          />
        </div>
        <div id="legend" />
      </div>
    </div>
  );
}

const styles = {
  pieContainer: {
    width: "40%",
    height: "40%",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)"
  },
  relative: {
    position: "relative"
  }
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
