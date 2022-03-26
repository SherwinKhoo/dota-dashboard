import React, { useState } from "react";
import ICONS from "../images/icon/index.js";

const MatchContainer = () => {
  const [matchID, setMatchID] = useState(``);
  const [matchDetails, setMatchDetails] = useState([]);

  const [matchIsLoading, setMatchIsLoading] = useState("");
  const [matchError, setMatchError] = useState(null);

  const apiKey = `69fa7262-4da6-43f4-86ce-e69839682f49`;

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
    } catch (err) {
      setMatchError(err.message);
    }
    setMatchIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMatch();
    setMatchID(event.target.value);
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit} className="row">
          <button>Load Match</button>
          <input
            className="matchInput"
            value={matchID}
            text="text"
            placeholder="Enter match ID"
          />
        </form>
      </div>
    </div>
  );
};

export default MatchContainer;
