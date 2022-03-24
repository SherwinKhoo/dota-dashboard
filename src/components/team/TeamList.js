import React from "react";

const TeamList = (props) => {
  const teamListFiltered = props.teamList.map((list, index) => {
    const handleClick = () => {
      props.setTeamID(list.team_id);
      props.fetchTeamMatchList(list.team_id);
      props.fetchHeroStatsList();
      props.setTeamHasSearched(true);
    };
    return (
      <>
        {list.name.toLowerCase().includes(props.teamSelection.toLowerCase()) ? (
          <div key={index} className="teamList col-md-2">
            <div className="avatar">
              {list.logo_url ? (
                <img
                  className="teamAvatar"
                  src={list.logo_url}
                  alt={list.name}
                  onClick={handleClick}
                />
              ) : (
                <img
                  className="teamAvatar"
                  src="https://cdn.browshot.com/static/images/not-found.png"
                  alt="Image not found."
                />
              )}
            </div>
            <div className="listData">
              <div className="name" onClick={handleClick}>
                {list.name}
              </div>
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
  return <div className="container">{teamListFiltered}</div>;
};

export default TeamList;
