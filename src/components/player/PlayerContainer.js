import React, { useEffect, useState } from "react";
import PlayerList from "./PlayerList";
import PlayerSearch from "./PlayerSearch";
import PlayerMatchList from "./PlayerMatchList";
import InvokerSpinner from "../spinner/LoadingSpinner";

const PlayerContainer = (props) => {
  // contents of input box in <PlayerSearch/>
  const [playerSelection, setPlayerSelection] = useState("");
  // list of players in <PlayerList/>
  const [playerList, setPlayerList] = useState([]);
  // loading and error handling when fetching player data to populate <PlayerList/>
  const [playerIsLoading, setPlayerIsLoading] = useState("");
  const [playerError, setPlayerError] = useState(null);

  const [playerAccountID, setPlayerAccountID] = useState(``);
  // most recent 20 matches in <PlayerMatchList/>
  const [playerMatchList, setPlayerMatchList] = useState([]);
  // loading and error handling when fetching match data to populate <PlayerMatchList/>
  const [playerMatchIsLoading, setPlayerMatchIsLoading] = useState("");
  const [playerMatchError, setPlayerMatchError] = useState(null);

  // basic stats for all 124 heroes
  const [heroStats, setHeroStats] = useState([]);
  // loading and error handling when fetching hero data
  const [heroStatsIsLoading, setHeroStatsIsLoading] = useState("");
  const [heroStatsError, setHeroStatsError] = useState(null);

  // toggle between <PlayerList/> and <PlayerMatchList/>
  const [playerHasSearched, setPlayerHasSearched] = useState(false);

  const [apiKey, setAPIKey] = useState("");

  // recall from localStorage
  useEffect(() => {
    const playerListStore = localStorage.getItem("playerListStore");
    if (playerListStore) {
      setPlayerList(JSON.parse(playerListStore)); // parse back from string
    }
  }, []); // only render once

  useEffect(() => {
    localStorage.setItem("playerListStore", JSON.stringify(playerList)); // can only save string
  });

  // retrieve API Key
  useEffect(() => {
    const getAPIKey = localStorage.getItem("apiStore");
    if (getAPIKey) {
      setAPIKey(JSON.parse(getAPIKey));
    }
  }, []);

  console.log(apiKey);

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

  const fetchPlayerMatchList = async (account_id) => {
    setPlayerMatchIsLoading(true);
    setPlayerMatchError(null);

    try {
      const playerMatchURL = `https://api.opendota.com/api/players/${account_id}/recentMatches/?api_key=${apiKey}`;
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
              {/* {playerMatchIsLoading && <p>Loading... please wait</p>} */}
              {playerMatchIsLoading && <InvokerSpinner />}
              {!playerMatchIsLoading && playerMatchError && (
                <p>{playerMatchError}</p>
              )}
            </h5>
            <h5>
              {heroStatsIsLoading && <p>Loading... please wait</p>}
              {/* {heroStatsIsLoading && <InvokerSpinner />} */}
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
              {/* {playerIsLoading && <p>Loading... please wait</p>} */}
              {playerIsLoading && <InvokerSpinner />}
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
