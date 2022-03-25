import React, { useEffect, useState } from "react";
import TeamList from "./TeamList";
import TeamSearch from "./TeamSearch";
import TeamMatchList from "./TeamMatchList";
import InvokerSpinner from "../spinner/LoadingSpinner";

const TeamContainer = () => {
  // contents of input box
  const [teamSelection, setTeamSelection] = useState("");
  // list of teams
  const [teamList, setTeamList] = useState([]);
  // loading and error
  const [teamIsLoading, setTeamIsLoading] = useState("");
  const [teamError, setTeamError] = useState(null);

  const [teamID, setTeamID] = useState("");
  // list of team mathes
  const [teamMatchList, setTeamMatchList] = useState([]);
  // loading and error handling
  const [teamMatchIsLoading, setTeamMatchIsLoading] = useState("");
  const [teamMatchError, setTeamMatchError] = useState(null);

  // basic stats for all 124 heroes
  const [heroStats, setHeroStats] = useState([]);
  // loading and error handling when fetching hero data
  const [heroStatsIsLoading, setHeroStatsIsLoading] = useState("");
  const [heroStatsError, setHeroStatsError] = useState(null);

  // toggle between <TeamList/> and <TeamMatchList/>
  const [teamHasSearched, setTeamHasSearched] = useState(false);

  // const [apiKey, setAPIKey] = useState(``);

  // recall from localStorage
  useEffect(() => {
    const teamListStore = localStorage.getItem("teamListStore");
    if (teamListStore) {
      setTeamList(JSON.parse(teamListStore)); // parse back from string
    }
  }, []); // only render once

  useEffect(() => {
    localStorage.setItem("teamListStore", JSON.stringify(teamList)); // can only save string
  });

  const apiKey = `69fa7262-4da6-43f4-86ce-e69839682f49`;

  const fetchTeamList = async () => {
    setTeamIsLoading(true);
    setTeamError(null);

    try {
      const teamURL = `https://api.opendota.com/api/teams?api_key=${apiKey}`;
      const responseTeamList = await fetch(teamURL);

      if (responseTeamList.status !== 200) {
        throw new Error("Team List: HTTP Status not OK");
      }
      const teamListData = await responseTeamList.json();

      setTeamList(teamListData);
    } catch (err) {
      setTeamError(err.message);
    }
    setTeamIsLoading(false);
  };

  const fetchTeamMatchList = async (team_id) => {
    setTeamMatchIsLoading(true);
    setTeamMatchError(null);

    try {
      const teamMatchURL = `https://api.opendota.com/api/teams/${team_id}/matches?api_key=${apiKey}`;
      const responseTeamMatchList = await fetch(teamMatchURL);

      if (responseTeamMatchList.status !== 200) {
        throw new Error("Match List: HTTP Status not OK");
      }
      const teamMatchListData = await responseTeamMatchList.json();

      setTeamMatchList(teamMatchListData);
    } catch (err) {
      setTeamMatchError(err.message);
    }
    setTeamMatchIsLoading(false);
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
        {teamHasSearched ? (
          <>
            <h1>UNDER CONSTRUCTION</h1>
            <div>
              <TeamMatchList
                teamMatchList={teamMatchList}
                setTeamHasSearched={setTeamHasSearched}
                heroStats={heroStats}
              />
            </div>
            <h5>
              {/* {teamMatchIsLoading && <p>Loading... please wait</p>} */}
              {teamMatchIsLoading && <InvokerSpinner />}
              {!teamMatchIsLoading && teamMatchError && <p>{teamMatchError}</p>}
            </h5>
            <h5>
              {heroStatsIsLoading && <p>Loading... please wait</p>}
              {/* {heroStatsIsLoading && <InvokerSpinner />} */}
              {!heroStatsIsLoading && heroStatsError && <p>{heroStatsError}</p>}
            </h5>
          </>
        ) : (
          <>
            <div className="teamSearch">
              <TeamSearch
                teamSelection={teamSelection}
                setTeamSelection={setTeamSelection}
                fetchTeamList={fetchTeamList}
              />
            </div>
            <h5>
              {/* {teamIsLoading && <p>Loading... please wait</p>} */}
              {teamIsLoading && <InvokerSpinner />}
              {!teamIsLoading && teamError && <p>{teamError}</p>}
            </h5>
            <div className="teamList">
              <TeamList
                teamSelection={teamSelection}
                teamList={teamList}
                setTeamID={setTeamID}
                fetchTeamMatchList={fetchTeamMatchList}
                fetchHeroStatsList={fetchHeroStatsList}
                setTeamHasSearched={setTeamHasSearched}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamContainer;
