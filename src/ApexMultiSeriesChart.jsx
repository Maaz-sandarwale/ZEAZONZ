import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import values from "./data.json";

const userMap = {
  23: { name: "Jack A", color: "#ff0000" },
  24: { name: "John M", color: "#00ff00" },
  27: { name: "Richard M", color: "#0000ff" },
};
const { layers } = values;

function ApexMultiSeriesChart({ Dataval }) {
  const [filterData, setFilterData] = useState();
  const [seriesDataval, setSeriesDataval] = useState(
    Object.keys(userMap).map((userId) => {
      const userLayers = layers.map((layer) => {
        const filteredLayers = layer.layers.filter(
          (subLayer) => subLayer.userId === parseInt(userId)
        );
        return filteredLayers.length > 0
          ? filteredLayers.map((subLayer) => ({
              x: `Layer ${layer.number}`,
              y: [
                new Date(subLayer.startDate).getTime(),
                new Date(subLayer.endDate).getTime(),
              ],
            }))
          : [];
      });

      return {
        name: userMap[userId].name,
        data: userLayers.flat(),
      };
    })
  );

  const [datachart, setDatachart] = useState({
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: undefined,
        // formatter: function (val, opts) {
        //   return val;
        // },
        style: {
          colors: ["#f3f4f5", "#fff"],
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      xaxis: {
        type: "datetime",
        position: "top",
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      legend: {
        position: "top",
      },
      annotations: {
        points: [
          {
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396",
              },
            },
          },
        ],
      },
    },
    selection: filterData,
  });

  const updateData = (timeline) => {
    console.log("Time linw", timeline);
    setDatachart((prevChartData) => ({
      ...prevChartData,
      selection: timeline,
    }));
    switch (timeline) {
      case "1 DAY":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("2022-10-01 08:00").getTime(),
          new Date("2022-10-01 18:30").getTime()
        );
        break;
      case "2 DAY":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("2022-10-01 08:00").getTime(),
          new Date("2022-10-02 18:30").getTime()
        );
        break;
      case "1 WEEK":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("2022-10-01 08:00").getTime(),
          new Date("2022-10-07 18:30").getTime()
        );
        break;
      case "2 WEEK":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("2022-10-01 08:00").getTime(),
          new Date("2022-10-14 18:30").getTime()
        );
        break;
      case "1 MONTH":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("2022-10-01 08:00").getTime(),
          new Date("2022-10-31 18:30").getTime()
        );
        break;
      default:
    }
  };

  useEffect(() => {
    setFilterData(Dataval);
    updateData(Dataval);
  }, [Dataval]);

  const seriesData = Object.keys(userMap).map((userId) => {
    const userLayers = layers.map((layer) => {
      const filteredLayers = layer.layers.filter(
        (subLayer) => subLayer.userId === parseInt(userId)
      );
      return filteredLayers.length > 0
        ? filteredLayers.map((subLayer) => ({
            x: `Layer ${layer.number}`,
            y: [
              new Date(subLayer.startDate).getTime(),
              new Date(subLayer.endDate).getTime(),
            ],
          }))
        : [];
    });

    return {
      name: userMap[userId].name,
      data: userLayers.flat(),
    };
  });
  return (
    <div>
      <Chart
        type="rangeBar"
        height={400}
        options={datachart.options}
        series={seriesDataval}
      />
    </div>
  );
}
export default ApexMultiSeriesChart;
