import React from "react";

const PlayerList = (props) => {
  const playerListFiltered = props.playerList.map((list, index) => {
    const handleClick = () => {
      props.setPlayerAccountID(list.account_id);
      props.fetchPlayerMatchList(list.account_id);
      props.fetchHeroStatsList();
      props.setPlayerHasSearched(true);
    };
    return (
      <>
        {list.name
          .toLowerCase()
          .includes(props.playerSelection.toLowerCase()) ? (
          <div key={index} className="playerList col-md-3">
            <div className="avatar">
              {list.avatarfull ? (
                <img
                  className="playerAvatar"
                  src={list.avatarfull}
                  alt={list.name}
                  onClick={handleClick}
                />
              ) : (
                <img
                  className="playerAvatar"
                  src="https://cdn.browshot.com/static/images/not-found.png"
                  alt="Image not found."
                />
              )}
            </div>
            <div className="listData">
              <div className="playerName orange" onClick={handleClick}>
                {list.name}
                <div className="playerTeam grey">{list.team_name}</div>
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
  return <div className="container">{playerListFiltered}</div>;
};

export default PlayerList;
