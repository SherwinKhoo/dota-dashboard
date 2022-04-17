import React, { useEffect, useState } from "react";

const TeamMatchList = (props) => {
  const [teams, setTeams] = useState();

  const onSearchAgain = () => {
    props.setTeamHasSearched(false);
  };
  console.log(props.teamMatchList);

  // retrieve teams
  useEffect(() => {
    const getTeams = localStorage.getItem("teamListStore");
    if (getTeams) {
      setTeams(JSON.parse(getTeams));
    }
  }, []);

  console.log(teams);

  const teamMatchListFiltered = props.teamMatchList
    .slice(0, 20)
    .map((list, index) => {
      return (
        <div key={index} className="matchList col-md-4">
          <div className="matchTeam orange">
            <h5>{list.match_id}</h5>
          </div>
          <div className="matchStats">
            <h5>
              {list.radiant_team_id} {list.radiant_score} - {list.dire_score}{" "}
              {list.dire_team_id}
            </h5>
            <h5>{list.radiant_win}</h5>
          </div>
        </div>
      );
    });
  return (
    <>
      <div>
        <button className="centered row" onClick={onSearchAgain}>
          Search again
        </button>
        <div className="container">{teamMatchListFiltered}</div>
      </div>
    </>
  );
};

export default TeamMatchList;
