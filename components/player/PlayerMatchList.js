import React from "react";
import ICONS from "../images/icon/index.js";

const PlayerMatchList = (props) => {
  const onSearchAgain = () => {
    props.setPlayerHasSearched(false);
  };

  const playerMatchListFiltered = props.playerMatchList.map((list, index) => {
    // const playerHero = ICONS.find((ID) => ID === list.hero_id);
    const playerHero = props.heroStats.find((ID) => ID.id === list.hero_id);
    // const playerHeroSource = `https://api.opendota.com${playerHero.img}api_key=69fa7262-4da6-43f4-86ce-e69839682f49`;

    // const epochTimeInSeconds = list.start_time;
    // const humanTime = new Date(0);
    // const gameTime = humanTime.setUTCSeconds(parseInt(epochTimeInSeconds));

    return (
      <div key={index} className="matchList col-md-2">
        {/* <img className="heroImage" src={list.hero_id} /> */}
        <img className="heroImage" src={ICONS[playerHero.id]} />
        <div className="heroAttr">
          <h5 className="matchID orange">{list.match_id}</h5>
          <h5 className="heroName grey">{playerHero.localized_name}</h5>
          <h5 className="matchStats grey">
            K/D/A: {list.kills}/{list.deaths}/{list.assists}
            {/* {" "}{list.start_time}{" "}{humanTime} {gameTime} */}
          </h5>
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
        <br />
        <br />
        <div className="container">{playerMatchListFiltered}</div>
      </div>
    </>
  );
};

export default PlayerMatchList;
