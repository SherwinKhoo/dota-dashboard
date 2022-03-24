import React from "react";
import ICONS from "../images/icon/index.js";

const TeamMatchList = (props) => {
  const onSearchAgain = () => {
    props.setTeamHasSearched(false);
  };
  console.log(props.teamMatchList);
  const teamMatchListFiltered = props.teamMatchList.map((list, index) => {
    return (
      <div key={index} className="matchList col-md-2">
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
      <button onClick={onSearchAgain}>Search again</button>
      <br />
      <div>{teamMatchListFiltered}</div>
    </>
  );
};

export default TeamMatchList;
