import React from "react";

const PlayerMatchList = (props) => {
  const onSearchAgain = () => {
    props.setPlayerHasSearched(false);
  };
  const playerMatchListFiltered = props.playerMatchList.map((list, index) => {
    const playerHero = props.heroStats.find((ID) => ID.id === list.hero_id);
    const playerHeroSource = `https://api.opendota.com${playerHero.img}`;
    return (
      <div key={index} className="matchList">
        <div className="matchHero">
          <img className="heroImage" src={playerHeroSource} />
          <h5>ID: {list.match_id}</h5>
        </div>
        <div className="matchStats">
          <h5>
            K/D/A: {list.kills}/{list.deaths}/{list.assists}
          </h5>
        </div>
      </div>
    );
  });
  return (
    <>
      <button onClick={onSearchAgain}>Search again</button>
      <br />
      <div className="container">{playerMatchListFiltered}</div>
    </>
  );
};

export default PlayerMatchList;
