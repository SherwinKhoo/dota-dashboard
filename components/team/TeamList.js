import React from "react";

const TeamList = (props) => {
  const teamListFiltered = props.teamList.map((list, index) => {
    return (
      <div key={index}>
        {list.name.toLowerCase().includes(props.teamSelection.toLowerCase()) ? (
          <>
            <div className="teamAvatar">
              <img src={list.logo_url} alt={list.name} />
            </div>
            <div className="teamListData">
              <name className="name">Name: {list.name}</name>
              <button className="button">Get matches</button>
            </div>
            <br />
          </>
        ) : null}
      </div>
    );
  });
  return <>{teamListFiltered}</>;
};

export default TeamList;
