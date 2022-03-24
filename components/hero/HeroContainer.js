import React, { useEffect, useState } from "react";
import ICONS from "../images/icon/index.js";
import InvokerSpinner from "../spinner/LoadingSpinner";

const HeroContainer = () => {
  // contents of input box
  const [heroSelection, setHeroSelection] = useState("");

  // all 124 heroes
  const [heroStats, setHeroStats] = useState([]);
  // loading and error handling when fetching hero data
  const [heroStatsIsLoading, setHeroStatsIsLoading] = useState("");
  const [heroStatsError, setHeroStatsError] = useState(null);

  const apiKey = `69fa7262-4da6-43f4-86ce-e69839682f49`;

  const fetchHeroStatsList = async () => {
    setHeroStatsIsLoading(true);
    setHeroStatsError(null);

    try {
      const heroStatsURL = `https://api.opendota.com/api/heroStats?api_key=${apiKey}`;
      const responseHeroStatsList = await fetch(heroStatsURL);

      if (responseHeroStatsList.status !== 200) {
        throw new Error("Hero List: HTTP Status not OK");
      }

      const heroStatsData = await responseHeroStatsList.json();

      //   const heroStatsDataSorted = heroStatsData.sort((a, b) => {
      //     return a.name - b.name;
      //   });

      const heroStatsDataSorted = heroStatsData.sort((a, b) =>
        a.localized_name
          .toLowerCase()
          .localeCompare(b.localized_name.toLowerCase())
      );

      console.log(heroStatsData);
      console.log(heroStatsDataSorted);

      setHeroStats(heroStatsDataSorted);
    } catch (err) {
      setHeroStatsError(err.message);
    }
    setHeroStatsIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchHeroStatsList();
  };

  const handleChange = (event) => {
    setHeroSelection(event.target.value);
  };

  const heroFiltered = heroStats.map((list, index) => {
    // const iWillBeYourHero = heroStats.filter((ID) => ID.id === list.hero_id);

    return (
      <div key={index}>
        <img
          className="heroImage heroPage"
          src={ICONS[list.hero_id]}
          alt={list.localized_name}
        />
      </div>
    );
  });

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="row">
          <button>Load Heroes</button>
          <input
            className="heroInput"
            onChange={handleChange}
            value={heroSelection}
            text="text"
            placeholder="Enter hero name"
          />
          <br />
        </form>
      </div>
      <div className="container heroList">{heroFiltered}</div>
      <h5>
        {/* {heroStatsIsLoading && <p>Loading... please wait</p>} */}
        {heroStatsIsLoading && <InvokerSpinner />}
        {!heroStatsIsLoading && heroStatsError && <p>{heroStatsError}</p>}
      </h5>
    </>
  );
};

export default HeroContainer;
