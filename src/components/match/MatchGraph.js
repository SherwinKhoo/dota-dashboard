import React from "react";
import Chart from "react-apexcharts";

const MatchGraph = (props) => {
  // chart stuff
  const series = [
    {
      name: "Gold Difference",
      data: props.matchDetails.radiant_gold_adv,
    },
    {
      name: "Experience Difference",
      data: props.matchDetails.radiant_xp_adv,
    },
  ];

  const timeSeries = [];
  for (let i = 0; i < props.matchDetails.radiant_gold_adv?.length; i++) {
    timeSeries.push(i);
  }

  console.log(props.matchDetails.radiant_gold_adv);
  console.log(props.matchDetails.radiant_xp_adv);
  console.log(timeSeries);

  const options = {
    chart: {
      type: "line",
    },
    colors: ["#FFD700", "#0000FF"],
    legend: {
      labels: {
        colors: ["#fff"],
      },
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    xaxis: {
      categories: timeSeries,
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
  };

  return (
    <>
      <Chart options={options} series={series} />
    </>
  );
};

export default MatchGraph;
