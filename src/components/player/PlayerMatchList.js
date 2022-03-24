import React from "react";
import ICONS from "../images/icon/index.js";
import statsStats from "../json/heroStats.json";

const PlayerMatchList = (props) => {
  const onSearchAgain = () => {
    props.setPlayerHasSearched(false);
  };
  const playerMatchListFiltered = props.playerMatchList.map((list, index) => {
    // const playerHero = ICONS.find((ID) => ID === list.hero_id);
    // const playerHero = props.heroStats.find((ID) => ID.id === list.hero_id);
    const playerHero = statsStats.find((ID) => ID.id === list.hero_id);

    // const playerHeroSource = `https://api.opendota.com${playerHero.img}api_key=69fa7262-4da6-43f4-86ce-e69839682f49`;

    let epochTimeInSeconds = list.start_time;
    epochTimeInSeconds = Number(epochTimeInSeconds);
    const date = new Date(epochTimeInSeconds * 1000);
    const formattedDate = JSON.stringify(date).slice(1, 11);

    return (
      <div key={index} className="matchList col-md-2">
        {/* <img className="heroImage" src={list.hero_id} /> */}
        <img className="heroImage" src={ICONS[playerHero.id]} />
        <div className="heroAttr">
          <h5
            className="matchID orange"
            onClick={() => {
              navigator.clipboard.writeText(list.match_id);
            }}
          >
            {list.match_id}
          </h5>
          <h5 className="heroName grey">{playerHero.localized_name}</h5>
          <h5 className="matchStats grey">
            K/D/A: {list.kills}/{list.deaths}/{list.assists}
          </h5>
          <h5 className="matchDate grey">{formattedDate}</h5>
        </div>
      </div>
    );
  });
  console.log(playerMatchListFiltered);
  return (
    <>
      <div>
        <button className="centered row" onClick={onSearchAgain}>
          Search again
        </button>
        <div className="container">{playerMatchListFiltered}</div>
      </div>
    </>
  );
};

export default PlayerMatchList;
