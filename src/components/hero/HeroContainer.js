import React, { useEffect, useState } from "react";
import ICONS from "../images/icon/index.js";
import GREYSCALE from "../images/greyscale/index.js";
import ATTR from "../images/attribute/index.js";
import InvokerSpinner from "../spinner/LoadingSpinner";
// import statsStats from "../json/heroStats.json";

const HeroContainer = (props) => {
  // contents of input box
  const [heroSelection, setHeroSelection] = useState("");

  // all 124 heroes
  const [heroStats, setHeroStats] = useState([]);
  // loading and error handling when fetching hero data
  const [heroStatsIsLoading, setHeroStatsIsLoading] = useState("");
  const [heroStatsError, setHeroStatsError] = useState(null);

  const [heroID, setHeroID] = useState(``);
  // const [heroName, setHeroName] = useState(``);
  // const [heroAttr, setHeroAttr] = useState(``);

  const [apiKey, setAPIKey] = useState("");

  // fetch heroes on screen load
  useEffect(() => {
    fetchHeroStatsList();
  }, []);

  // recall from localStorage
  useEffect(() => {
    const heroStatsStore = localStorage.getItem("heroStatsStore");
    if (heroStatsStore) {
      setHeroStats(JSON.parse(heroStatsStore)); // parse back from strong
    }
  }, []); // only render once

  useEffect(() => {
    localStorage.setItem("heroStatsStore", JSON.stringify(heroStats)); // can only save string
  });

  // retrieve API Key
  useEffect(() => {
    const getAPIKey = localStorage.getItem("apiStore");
    if (getAPIKey) {
      setAPIKey(JSON.parse(getAPIKey));
    }
  }, []);

  console.log(apiKey);

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

      const heroStatsDataSorted = heroStatsData.sort((a, b) =>
        // const heroStatsDataSorted = statsStats.sort((a, b) =>
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

  const handleReload = (event) => {
    event.preventDefault();
    fetchHeroStatsList();
  };

  const handleChange = (event) => {
    setHeroSelection(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setHeroID(event.target.id);
    // setHeroName(event.target.alt);
    // setHeroAttr(event.target.text);
  };

  const heroStrFiltered = heroStats.map((list, index) => {
    if (list.primary_attr === "str") {
      return (
        <>
          {list.localized_name
            .toLowerCase()
            .includes(heroSelection.toLowerCase()) ? (
            <img
              onClick={handleClick}
              className="heroImage heroPage"
              src={ICONS[list.hero_id]}
              alt={list.localized_name}
              id={list.hero_id}
              text={list.primary_attr}
            />
          ) : (
            <img
              onClick={handleClick}
              className="greyscale heroImage heroPage"
              src={GREYSCALE[list.hero_id]}
              alt={list.localized_name}
              id={list.hero_id}
            />
          )}
        </>
      );
    }
  });

  const heroAgiFiltered = heroStats.map((list, index) => {
    if (list.primary_attr === "agi") {
      return (
        <>
          {list.localized_name
            .toLowerCase()
            .includes(heroSelection.toLowerCase()) ? (
            <img
              onClick={handleClick}
              className="heroImage heroPage"
              src={ICONS[list.hero_id]}
              alt={list.localized_name}
              id={list.hero_id}
              text={list.primary_attr}
            />
          ) : (
            <img
              onClick={handleClick}
              className="greyscale heroImage heroPage"
              src={GREYSCALE[list.hero_id]}
              alt={list.localized_name}
              id={list.hero_id}
            />
          )}
        </>
      );
    }
  });

  const heroIntFiltered = heroStats.map((list, index) => {
    if (list.primary_attr === "int") {
      return (
        <>
          {list.localized_name
            .toLowerCase()
            .includes(heroSelection.toLowerCase()) ? (
            <img
              onClick={handleClick}
              className="heroImage heroPage"
              src={ICONS[list.hero_id]}
              alt={list.localized_name}
              id={list.hero_id}
              text={list.primary_attr}
            />
          ) : (
            <img
              onClick={handleClick}
              className="greyscale heroImage heroPage"
              src={GREYSCALE[list.hero_id]}
              alt={list.localized_name}
              id={list.hero_id}
            />
          )}
        </>
      );
    }
  });

  console.log(heroID);
  // console.log(statsStats);
  console.log(heroStats);

  const heroProfile = heroStats.map((list, index) => {
    // const heroProfile = statsStats.map((list, index) => {
    const heroRoles = list.roles.map((roles) => {
      return (
        <>
          <h5>{roles}</h5>
        </>
      );
    });

    if (parseInt(list.id) === parseInt(heroID)) {
      return (
        <div key={index}>
          <img className="heroProfile" src={ICONS[heroID]} alt="" />
          <br />
          <br />
          <div className="row">
            <img
              src={`https://api.opendota.com` + list.icon}
              className="col-md-2"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <h4 className="col-md-10">{list.localized_name}</h4>
          </div>
          <div className="row">
            <img
              src={ATTR[list.primary_attr]}
              className="col-md-2"
              style={{ objectFit: "cover" }}
            />{" "}
            <div className="col-md-10">
              <h5>
                {list.primary_attr === "str"
                  ? "Strength"
                  : list.primary_attr === "agi"
                  ? "Agility"
                  : "Intelligence"}
                &nbsp;
                {list.attack_type}
              </h5>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-5">Roles: </div>
            <div className="col-md-7">
              <div>{heroRoles}</div>
            </div>
          </div>
          <br />
          <div className="row">
            <h5 className="col-md-5">Win-rate:</h5>
            {list.pro_pick > 0 ? (
              <>
                <h5
                  className="col-md-7"
                  style={{
                    color:
                      `rgb(` +
                      (255 - Math.round((list.pro_win / list.pro_pick) * 255)) +
                      `,` +
                      (Math.round((list.pro_win / list.pro_pick) * 255) + 70) +
                      `, 0)`,
                  }}
                >
                  {Math.round((list.pro_win / list.pro_pick) * 10000) / 100}%
                </h5>
              </>
            ) : (
              <h5 className="col-md-7">No data</h5>
            )}
          </div>
          <br />
          <div className="row">
            <h5 className="col-md-5">Attack:</h5>
            <h5 className="col-md-7">
              {list.base_attack_min +
                list.base_str +
                ` - ` +
                (list.base_attack_max + list.base_str)}
            </h5>
          </div>
          <div className="row">
            <h5 className="col-md-5">Attack Speed:</h5>
            <h5 className="col-md-7">{list.attack_rate}</h5>
          </div>
          <div className="row">
            <h5 className="col-md-5">Range:</h5>
            <h5 className="col-md-7">{list.attack_range}</h5>
          </div>
          <div className="row">
            <h5 className="col-md-5">Armour:</h5>
            <h5 className="col-md-7">
              &nbsp;&nbsp;
              {Math.round(list.base_armor + list.base_agi / 6)}
            </h5>
            {/* <h5 className="col-md-1">
              {`(` +
                Math.round((list.base_armor + list.base_agi / 6) * 100) / 100 +
                `)`}
            </h5> */}
          </div>
          <br />
          <div className="row">
            <h5 className="col-md-5">Movespeed:</h5>
            <h5 className="col-md-7">{list.move_speed}</h5>
          </div>
          <br />
          <div className="row">
            <h5 className="col-md-5">Health:</h5>
            <h5 className="col-md-7">
              {list.base_health + list.base_str * 20}
            </h5>
          </div>
          <div className="row">
            <h5 className="col-md-5">Health Regen:</h5>
            <h5 className="col-md-7">{list.base_health_regen}</h5>
          </div>
          <div className="row">
            <h5 className="col-md-5">Mana:</h5>
            <h5 className="col-md-7">{list.base_mana + list.base_int * 12}</h5>
          </div>
          <div className="row">
            <h5 className="col-md-5">Mana Regen:</h5>
            <h5 className="col-md-7">{list.base_mana_regen}</h5>
          </div>
          <br />
          <div className="row">
            <h5 className="col-md-5">Strength:</h5>
            <h5 className="col-md-7">
              {list.base_str + ` + ` + list.str_gain}
            </h5>
          </div>
          <div className="row">
            <h5 className="col-md-5">Agility:</h5>
            <h5 className="col-md-7">
              {list.base_agi + ` + ` + list.agi_gain}
            </h5>
          </div>
          <div className="row">
            <h5 className="col-md-5">Intelligence:</h5>
            <h5 className="col-md-7">
              {list.base_int + ` + ` + list.int_gain}
            </h5>
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <div className="container">
        <div>
          <br />
          <form className="row">
            <button className="col-md-4" type="button" onClick={handleReload}>
              Reload
            </button>
            <input
              className="heroInput col-md-8"
              onChange={handleChange}
              value={heroSelection}
              text="text"
              placeholder="Enter hero name"
            />
          </form>
        </div>
        <h5>
          {/* {heroStatsIsLoading && <p>Loading... please wait</p>} */}
          {heroStatsIsLoading && <InvokerSpinner />}
          {!heroStatsIsLoading && heroStatsError && <p>{heroStatsError}</p>}
        </h5>
      </div>
      <div className="container profile">
        <div className="heroList col-md-8">
          <div className="heroFiltered">
            <h4>Strength</h4>
            <div>{heroStrFiltered}</div>
          </div>
          <div className="heroFiltered">
            <h4>Agility</h4>
            <div>{heroAgiFiltered}</div>
          </div>
          <div className="heroFiltered">
            <h4>Intelligence</h4>
            <div>{heroIntFiltered}</div>
          </div>
        </div>
        <div className="col-md-4">{heroProfile}</div>
      </div>
    </>
  );
};

export default HeroContainer;
