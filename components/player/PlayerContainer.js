import React, { useState } from "react";
import PlayerList from "./PlayerList";
import PlayerSearch from "./PlayerSearch";
import PlayerMatchList from "./PlayerMatchList";

const PlayerContainer = () => {
  const [playerSelection, setPlayerSelection] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [playerIsLoading, setPlayerIsLoading] = useState("");
  const [playerError, setPlayerError] = useState(null);

  const [playerAccountID, setPlayerAccountID] = useState(``);
  const [playerMatchList, setPlayerMatchList] = useState([]);
  const [playerMatchIsLoading, setPlayerMatchIsLoading] = useState("");
  const [playerMatchError, setPlayerMatchError] = useState(null);

  const [heroStats, setHeroStats] = useState([]);
  const [heroStatsIsLoading, setHeroStatsIsLoading] = useState("");
  const [heroStatsError, setHeroStatsError] = useState(null);

  const [playerHasSearched, setPlayerHasSearched] = useState(false);

  const apiKey = `69fa7262-4da6-43f4-86ce-e69839682f49`;

  const fetchPlayerList = async () => {
    setPlayerIsLoading(true);
    setPlayerError(null);

    try {
      const playerURL = `https://api.opendota.com/api/proPlayers?api_key=${apiKey}`;
      const responsePlayerList = await fetch(playerURL);

      if (responsePlayerList.status !== 200) {
        throw new Error("Player List: HTTP Status not OK");
      }
      const playerListData = await responsePlayerList.json();

      setPlayerList(playerListData);
    } catch (err) {
      setPlayerError(err.message);
    }
    setPlayerIsLoading(false);
  };

  const fetchPlayerMatchList = async (match) => {
    setPlayerMatchIsLoading(true);
    setPlayerMatchError(null);

    try {
      const playerMatchURL = `https://api.opendota.com/api/players/${match}/recentMatches?api_key=${apiKey}`;
      const responsePlayerMatchList = await fetch(playerMatchURL);

      if (responsePlayerMatchList.status !== 200) {
        throw new Error("Match List: HTTP Status not OK");
      }

      const playerMatchListData = await responsePlayerMatchList.json();

      setPlayerMatchList(playerMatchListData);
    } catch (err) {
      setPlayerMatchError(err.message);
    }
    setPlayerMatchIsLoading(false);
  };

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

      setHeroStats(heroStatsData);
    } catch (err) {
      setHeroStatsError(err.message);
    }
    setHeroStatsIsLoading(false);
  };

  return (
    <div>
      <div>
        {playerHasSearched ? (
          <>
            <div>
              <PlayerMatchList
                playerMatchList={playerMatchList}
                setPlayerHasSearched={setPlayerHasSearched}
                heroStats={heroStats}
              />
            </div>
            <h5>
              {playerMatchIsLoading && <p>Loading... please wait</p>}
              {!playerMatchIsLoading && playerMatchError && (
                <p>{playerMatchError}</p>
              )}
            </h5>
            <h5>
              {heroStatsIsLoading && <p>Loading... please wait</p>}
              {!heroStatsIsLoading && heroStatsError && <p>{heroStatsError}</p>}
            </h5>
          </>
        ) : (
          <>
            <div className="playerSearch">
              <PlayerSearch
                playerSelection={playerSelection}
                setPlayerSelection={setPlayerSelection}
                fetchPlayerList={fetchPlayerList}
              />
            </div>
            <h5>
              {playerIsLoading && <p>Loading... please wait</p>}
              {!playerIsLoading && playerError && <p>{playerError}</p>}
            </h5>
            <div className="playerList">
              <PlayerList
                playerSelection={playerSelection}
                playerList={playerList}
                setPlayerAccountID={setPlayerAccountID}
                fetchPlayerMatchList={fetchPlayerMatchList}
                fetchHeroStatsList={fetchHeroStatsList}
                setPlayerHasSearched={setPlayerHasSearched}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default PlayerContainer;
