"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const n = [
  "#0c8", // a.colors().theme.success,
  "#f36", // a.colors().theme.danger,
  "#ff8c00", // a.colors().theme.warning,
  "#8957ff", // a.colors().theme.primary ,
];

const options: ApexOptions = {
  chart: {
    zoom: { enabled: !1 },
    toolbar: { show: !1 },
    // shadow: { enabled: !1 },
    animations: { enabled: !1 },
    height: 300,
  },
  colors: n,
  stroke: { width: 4, curve: "smooth" },
  markers: { size: 0 },
  xaxis: {
    axisBorder: { show: !1 },
    axisTicks: { show: !1 },
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#999",
        fontSize: "13px",
        fontFamily: "#333",
        cssClass: "apexcharts-xaxis-label",
      },
    },
  },
  yaxis: {
    axisBorder: { show: !1 },
    axisTicks: { show: !1 },
    labels: {
      style: {
        colors: "#999",
        fontSize: "13px",
        fontFamily: "inherit",
        cssClass: "apexcharts-xaxis-label",
      },
    },
  },
  legend: { show: true, position: "right" },
  grid: { borderColor: "#f3f3f3", strokeDashArray: 3 },
  dataLabels: { enabled: !1 },
  tooltip: {
    shared: !0,
    intersect: !1,
    y: {
      formatter: function (e: number) {
        return void 0 !== e ? e.toFixed(0) + " orders" : e;
      },
    },
  },
};

const series = [
  {
    name: "Gold",
    data: [300, 100, 600, 90, 800, 70, 900, 120, 100, 1200, 140],
  },
  {
    name: "Silver",
    data: [500, 700, 300, 600, 400, 100, 400, 300, 900, 400, 100],
  },
  {
    name: "Bronze",
    data: [900, 50, 90, 200, 400, 700, 900, 200, 900, 600, 1200],
  },
];

function PerformanceChart() {
  return (
    <>
      {typeof window !== "undefined" && (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
        />
      )}
    </>
  );
}

export default PerformanceChart;
