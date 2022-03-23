import React, { useState } from "react";
import TeamList from "./TeamList";
import TeamSearch from "./TeamSearch";
import TeamMatchList from "./TeamMatchList";

const TeamContainer = () => {
  const [teamSelection, setTeamSelection] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [teamIsLoading, setTeamIsLoading] = useState("");
  const [teamError, setTeamError] = useState(null);

  const [teamID, setTeamID] = useState("");
  const [teamMatchList, setTeamMatchList] = useState([]);
  const [teamMatchIsLoading, setTeamMatchIsLoading] = useState("");
  const [teamMatchError, setTeamMatchError] = useState(null);

  const [teamHasSearched, setTeamHasSearched] = useState(false);

  const apiKey = `69fa7262-4da6-43f4-86ce-e69839682f49`;
  const teamURL = `https://api.opendota.com/api/teams?api_key=${apiKey}`;
  const teamMatchURL = `https://api.opendota.com/api/teams/${teamID}/matches?api_key=${apiKey}`;

  const fetchTeamList = async () => {
    setTeamIsLoading(true);
    setTeamError(null);

    try {
      const responseTeamList = await fetch(teamURL);

      if (responseTeamList.status !== 200) {
        throw new Error("HTTP Status not OK");
      }
      const teamListData = await responseTeamList.json();

      setTeamList(teamListData);
    } catch (err) {
      setTeamError(err.message);
    }
    setTeamIsLoading(false);
  };

  const fetchTeamMatchList = async () => {
    setTeamMatchIsLoading(true);
    setTeamMatchError(null);

    try {
      const responseTeamMatchList = await fetch(teamMatchURL);

      if (responseTeamMatchList.status !== 200) {
        throw new Error("HTTP Status not OK");
      }
      const teamMatchListData = await responseTeamMatchList.json();

      setTeamMatchList(teamMatchListData);
    } catch (err) {
      setTeamMatchError(err.message);
    }
    setTeamMatchIsLoading(false);
  };

  return (
    <div>
      <div>
        {teamHasSearched ? (
          <>
            <div>
              <TeamMatchList
                teamMatchList={teamMatchList}
                setTeamHasSearched={setTeamHasSearched}
              />
            </div>
            <h5>
              {teamMatchIsLoading && <p>Loading... please wait</p>}
              {!teamMatchIsLoading && teamMatchError && <p>{teamMatchError}</p>}
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
              {teamIsLoading && <p>Loading... please wait</p>}
              {!teamIsLoading && teamError && <p>{teamError}</p>}
            </h5>
            <div className="teamList">
              <TeamList
                teamSelection={teamSelection}
                teamList={teamList}
                setTeamID={setTeamID}
                fetchTeamMatchList={fetchTeamMatchList}
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
