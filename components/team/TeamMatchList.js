import React from "react";

const TeamMatchList = (props) => {
  const onSearchAgain = () => {
    props.setTeamHasSearched(false);
  };
  const teamMatchListFiltered = props.teamMatchList.map((list, index) => {
    return (
      <div key={index}>
        <div className="matchTeam">
          <h5>Match ID: {list.match_id}</h5>
        </div>
        <div className="matchStats">
          <h5>
            {list.radiant_team_id} {list.radiant_score} - {list.dire_score}{" "}
            {list.radiant_team_id}
          </h5>
          <h5>{list.radiant_win}</h5>
        </div>
      </div>
    );
  });
  return (
    <>
      <button onClick={onSearchAgain}>Search again</button>
      <br />
      {teamMatchListFiltered}
    </>
  );
};

export default TeamMatchList;
