import React, { useEffect, useState } from "react";
import MatchGraph from "./MatchGraph.js";

import ICONS from "../images/icon/index.js";
import GREYSCALE from "../images/greyscale/index.js";

import InvokerSpinner from "../spinner/LoadingSpinner";

const MatchContainer = () => {
  const [matchID, setMatchID] = useState(``);
  const [matchDetails, setMatchDetails] = useState([]);
  // const [radiant, setRadiant] = useState([]);
  // const [dire, setDire] = useState([]);

  const [matchIsLoading, setMatchIsLoading] = useState("");
  const [matchError, setMatchError] = useState(null);

  const [apiKey, setAPIKey] = useState("");

  // console.log(matchDetails);
  // console.log(radiant);
  // console.log(dire);

  useEffect(() => {
    const idStore = localStorage.getItem("idStore");
    if (idStore) {
      setMatchID(JSON.parse(idStore));
    }
    // console.log(idStore);
  }, []);

  // retrieve API Key
  useEffect(() => {
    const getAPIKey = localStorage.getItem("apiStore");
    if (getAPIKey) {
      setAPIKey(JSON.parse(getAPIKey));
    }
  }, []);

  if (apiKey === 0) {
    console.log(apiKey);
  } else {
    console.log("No api");
  }

  useEffect(() => {
    const matchStore = localStorage.getItem("matchStore");
    if (matchStore) {
      setMatchDetails(JSON.parse(matchStore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("matchStore", JSON.stringify(matchDetails));
  });

  const fetchMatch = async () => {
    setMatchIsLoading(true);
    setMatchError(null);

    try {
      const matchURL = `https://api.opendota.com/api/matches/${matchID}?api_key=${apiKey}`;
      const responseMatch = await fetch(matchURL);

      if (responseMatch.status !== 200) {
        throw new Error("Match ID: HTTP Status not OK");
      }
      const matchData = await responseMatch.json();

      setMatchDetails(matchData);
      // setRadiant(matchData.radient_team);
      // setDire(matchData.dire_team);
    } catch (err) {
      setMatchError(err.message);
    }
    setMatchIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMatch();
  };

  const handleIDChange = (event) => {
    event.preventDefault();
    setMatchID(event.target.value);
  };

  console.log(matchID);

  const radiantPicks = [];
  const direPicks = [];

  for (let i = 0; i < matchDetails.players?.length; i++) {
    if (
      matchDetails.players[i].player_slot >= 0 &&
      matchDetails.players[i].player_slot <= 4
    ) {
      radiantPicks.push({
        assists: matchDetails.players[i].assists,
        deaths: matchDetails.players[i].deaths,
        gold_per_min: matchDetails.players[i].gold_per_min,
        hero_id: matchDetails.players[i].hero_id,
        kills: matchDetails.players[i].kills,
        xp_per_min: matchDetails.players[i].xp_per_min,
        name: matchDetails.players[i].name,
      });
    } else if (
      matchDetails.players[i].player_slot >= 128 &&
      matchDetails.players[i].player_slot <= 132
    ) {
      direPicks.push({
        assists: matchDetails.players[i].assists,
        deaths: matchDetails.players[i].deaths,
        gold_per_min: matchDetails.players[i].gold_per_min,
        hero_id: matchDetails.players[i].hero_id,
        kills: matchDetails.players[i].kills,
        xp_per_min: matchDetails.players[i].xp_per_min,
        name: matchDetails.players[i].name,
      });
    }
  }

  const radiantSidePick = radiantPicks.map((list, index) => {
    return (
      <div className="row">
        <div className="matchesIndividualHeroImageContainer col-md-6">
          <img
            src={ICONS[list.hero_id]}
            className="matchesIndividualHeroImage"
            alt=""
          />
        </div>
        <div className="matchesIndividualPlayer col-md-6">
          <h5 className="matchesIndividualPlayerStatRadiant playerName">
            {list.name}
          </h5>
          <h5 className="matchesIndividualPlayerStatRadiant">
            {list.kills} / {list.deaths} / {list.assists}
          </h5>
          <h5 className="matchesIndividualPlayerStatRadiant">
            {list.gold_per_min} gold per min
          </h5>
          <h5 className="matchesIndividualPlayerStatRadiant">
            {list.xp_per_min} xp per min
          </h5>
        </div>
      </div>
    );
  });

  const direSidePick = direPicks.map((list, index) => {
    return (
      <div className="row">
        <div className="matchesIndividualPlayer col-md-6">
          <h5 className="matchesIndividualPlayerStatDire playerName">
            {list.name}
          </h5>
          <h5 className="matchesIndividualPlayerStatDire">
            {list.kills} / {list.deaths} / {list.assists}
          </h5>
          <h5 className="matchesIndividualPlayerStatDire">
            {list.gold_per_min} gold per min
          </h5>
          <h5 className="matchesIndividualPlayerStatDire">
            {list.xp_per_min} xp per min
          </h5>
        </div>
        <div className="matchesIndividualHeroImageContainer col-md-6">
          <img
            src={ICONS[list.hero_id]}
            className="matchesIndividualHeroImage"
            alt=""
          />
        </div>
      </div>
    );
  });

  const bans = [];

  for (let i = 0; i < matchDetails.draft_timings?.length; i++) {
    if (matchDetails.draft_timings[i].pick === false) {
      bans.push(matchDetails.draft_timings[i].hero_id);
    }
  }

  // console.log(bans);

  const radiantBans = [];
  const direBans = [];

  for (let i = 0; i < bans?.length; i++) {
    if (i % 2 === 0) {
      radiantBans.push(bans[i]);
    } else {
      direBans.push(bans[i]);
    }
  }

  const radiantSideBans = radiantBans.map((list, index) => {
    return <img src={GREYSCALE[list]} className="matchesBanImage" alt="" />;
  });

  const direSideBans = direBans.map((list, index) => {
    return <img src={GREYSCALE[list]} className="matchesBanImage" alt="" />;
  });

  return (
    <div className="container matchesContainer">
      <div>
        <br />
        <form className="row">
          <button className="col-md-4" type="submit" onClick={handleSubmit}>
            Load
          </button>
          <input
            className="matchInput col-md-8"
            text="text"
            onChange={handleIDChange}
            placeholder="Enter match ID"
          />
        </form>
      </div>
      <h5>
        {/* {heroStatsIsLoading && <p>Loading... please wait</p>} */}
        {matchIsLoading && <InvokerSpinner />}
        {!matchIsLoading && matchError && <p>{matchError}</p>}
      </h5>
      <div className="row matches">
        <div className="col-md-4">
          <h3 className="matchesTeamName">{matchDetails.radiant_team?.name}</h3>
          <div className="matchesTeamLogoContainer">
            <img
              src={matchDetails.radiant_team?.logo_url}
              className="matchesTeamLogo"
              alt={matchDetails.radiant_team?.tag}
            />
          </div>
        </div>
        <div className="col-md-4">
          <h5 className="matchesID">Match ID: {matchDetails.match_id}</h5>
          <br />
          <h2 className="matchesScore">
            {matchDetails.radiant_score} - {matchDetails.dire_score}
          </h2>
        </div>
        <div className="col-md-4">
          <h3 className="matchesTeamName">{matchDetails.dire_team?.name}</h3>
          <div className="matchesTeamLogoContainer">
            <img
              src={matchDetails.dire_team?.logo_url}
              className="matchesTeamLogo"
              alt={matchDetails.dire_team?.tag}
            />
          </div>
        </div>
      </div>
      <div className="row matchesHeroes">
        <div className="col-md-1 matchesHeroBanContainer">
          {radiantSideBans}
        </div>
        <div className="col-md-5">
          <div>{radiantSidePick}</div>
        </div>
        <div className="col-md-5">{direSidePick}</div>
        <div className="col-md-1 matchesHeroBanContainer">{direSideBans}</div>
      </div>
      <br />
      <div className="row matchesChart">
        <h5>Gold and XP Advantage</h5>
        <MatchGraph matchDetails={matchDetails} />
      </div>
    </div>
  );
};

export default MatchContainer;
