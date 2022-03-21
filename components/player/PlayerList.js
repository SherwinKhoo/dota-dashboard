import React from "react";

const PlayerList = (props) => {
  const playerListFiltered = props.playerList.map((list, index) => {
    return (
      <div key={index}>
        {list.name
          .toLowerCase()
          .includes(props.playerSelection.toLowerCase()) ? (
          <>
            <div className="playerAvatar">
              <img src={list.avatarmedium} alt={list.name} />
            </div>
            <div className="playerListData">
              <name className="name">Name: {list.name}</name>
              <team className="team">Team: {list.team_name}</team>
              <button className="button">Get matches</button>
            </div>
            <br />
          </>
        ) : null}
      </div>
    );
  });
  return <>{playerListFiltered}</>;
};

export default PlayerList;
