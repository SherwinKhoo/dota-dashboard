import React, { useState } from "react";
import PlayerList from "./PlayerList";
import PlayerSearch from "./PlayerSearch";

const PlayerContainer = () => {
  const [playerSelection, setPlayerSelection] = useState("");
  const [playerList, setPlayerList] = useState([]);

  const [playerIsLoading, setPlayerIsLoading] = useState("");
  const [playerError, setPlayerError] = useState(null);

  const apiKey = `69fa7262-4da6-43f4-86ce-e69839682f49`;
  const listURL = `https://api.opendota.com/api/proPlayers?api_key=${apiKey}`;

  const fetchPlayerList = async () => {
    setPlayerIsLoading(true);
    setPlayerError(null);

    try {
      const responsePlayerList = await fetch(listURL);

      if (responsePlayerList.status !== 200) {
        throw new Error("HTTP Status not OK");
      }
      const playerListData = await responsePlayerList.json();

      setPlayerList(playerListData);
    } catch (err) {
      setPlayerError(err.message);
    }
    setPlayerIsLoading(false);
  };

  return (
    <div>
      <div className="playerSearch">
        <PlayerSearch
          playerSelection={playerSelection}
          setPlayerSelection={setPlayerSelection}
          fetchPlayerList={fetchPlayerList}
        />
      </div>
      <h5>
        {playerIsLoading && <p>Loading... please wait</p>}
        {!playerIsLoading && playerError && (
          <p>
            {playerError} <br /> Not enough mana!
          </p>
        )}
      </h5>
      <div className="playerList">
        <PlayerList playerSelection={playerSelection} playerList={playerList} />
      </div>
    </div>
  );
};

export default PlayerContainer;
