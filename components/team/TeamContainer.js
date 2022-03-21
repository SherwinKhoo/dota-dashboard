import React, { useState } from "react";
import TeamList from "./TeamList";
import TeamSearch from "./TeamSearch";

const TeamContainer = () => {
  const [teamSelection, setTeamSelection] = useState("");
  const [teamList, setTeamList] = useState([]);

  const [teamIsLoading, setTeamIsLoading] = useState("");
  const [teamError, setTeamError] = useState(null);

  const apiKey = `69fa7262-4da6-43f4-86ce-e69839682f49`;
  const teamURL = `https://api.opendota.com/api/teams?api_key=${apiKey}`;

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

  return (
    <div>
      <div className="teamSearch">
        <TeamSearch
          teamSelection={teamSelection}
          setTeamSelection={setTeamSelection}
          fetchTeamList={fetchTeamList}
        />
      </div>
      <h5>
        {teamIsLoading && <p>Loading... please wait</p>}
        {!teamIsLoading && teamError && (
          <p>
            {teamError} <br /> Not enough mana!
          </p>
        )}
      </h5>
      <div className="teamList">
        <TeamList teamSelection={teamSelection} teamList={teamList} />
      </div>
    </div>
  );
};

export default TeamContainer;
