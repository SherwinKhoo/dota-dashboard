import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const MatchGraph = () => {
  const [matchDetails, setMatchDetails] = useState([]);

  // get match details from localStorage
  useEffect(() => {
    const matchStore = localStorage.getItem("matchStore");
    if (matchStore) {
      setMatchDetails(JSON.parse(matchStore));
    }
  }, []);

  // chart stuff
  const series = [
    {
      name: "Gold Difference",
      data: matchDetails.radiant_gold_adv,
    },
    {
      name: "Experience Difference",
      data: matchDetails.radiant_xp_adv,
    },
  ];

  const timeSeries = [];
  for (let i = 0; i < matchDetails.radiant_gold_adv?.length; i++) {
    timeSeries.push(i);
  }

  console.log(matchDetails.radiant_gold_adv);
  console.log(matchDetails.radiant_xp_adv);
  console.log(timeSeries);

  const options = {
    chart: {
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#FFD700", "#0000FF"],
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
