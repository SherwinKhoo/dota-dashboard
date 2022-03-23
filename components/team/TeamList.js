import React from "react";

const TeamList = (props) => {
  const teamListFiltered = props.teamList.map((list, index) => {
    const handleClick = () => {
      props.setTeamID(list.team_id);
      props.fetchTeamMatchList();
      props.setTeamHasSearched(true);
    };
    return (
      <>
        {list.nam.toLowerCase().includes(props.teamSelection.toLowerCase()) ? (
          <div key={index}>
            <div className="avatar">
              <img src={list.logo_url} alt={list.name} onClick={handleClick} />
            </div>
            <div className="listData">
              <name className="name" onClick={handleClick}>
                {list.name}
              </name>
              {/* <button className="button" onClick={handleClick}>
                Get matches
              </button> */}
            </div>
            <br />
          </div>
        ) : null}
      </>
    );
  });
  return <>{teamListFiltered}</>;
};

export default TeamList;
