import React, { useEffect, useState } from "react";

import ICONS from "../images/icon/index.js";
import InvokerSpinner from "../spinner/LoadingSpinner";

const MatchContainer = () => {
  const [matchID, setMatchID] = useState(``);
  const [matchDetails, setMatchDetails] = useState([]);
  const [radiant, setRadiant] = useState([]);
  const [dire, setDire] = useState([]);

  const [matchIsLoading, setMatchIsLoading] = useState("");
  const [matchError, setMatchError] = useState(null);

  const [apiKey, setAPIKey] = useState("");

  console.log(matchDetails);
  console.log(radiant);
  console.log(dire);

  useEffect(() => {
    const idStore = localStorage.getItem("idStore");
    if (idStore) {
      setMatchID(JSON.parse(idStore));
    }
    console.log(idStore);
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
    console.log("it ran!", matchStore);
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
      setRadiant(matchData.radient_team);
      setDire(matchData.dire_team);
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

  return (
    <div className="container">
      <div>
        <br />
        <form className="row">
          <button type="submit" onClick={handleSubmit}>
            Load Match
          </button>
          <input
            className="matchInput"
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
      <div className="container matches">
        <div className="row">
          <h5 className="col-md-12">Match ID: {matchDetails.match_id}</h5>
        </div>
        <div className="row">
          <div className="col-md-3">
            <h2>Radiant: {radiant}</h2>
            {/* <img src={matchDetails.radiant_team.logo_url} /> */}
          </div>
          <div className="col-md-2">
            <div></div>
            <div></div>
          </div>
          <div className="col-md-2">
            <div></div>
            <div></div>
          </div>
          <div className="col-md-2">
            <div></div>
            <div></div>
          </div>
          <div className="col-md-3">
            {/* <h2>Dire: {matchDetails.dire_team.name}</h2> */}
            {/* <img src={matchDetails.dire_team.logo_url} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchContainer;
