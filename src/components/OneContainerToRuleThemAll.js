import React, { useEffect, useState } from "react";
import API from "./API";
import PlayerContainer from "./player/PlayerContainer";
import TeamContainer from "./team/TeamContainer";

const OneContainerToRuleThemAll = () => {
  const [apiKey, setApiKey] = useState("");

  // recall from localStorage
  useEffect(() => {
    const apiStore = localStorage.getItem("apiStore");
    if (apiStore) {
      setApiKey(JSON.parse(apiStore)); // parse back from string
    }
  }, []); // only render once

  console.log(apiKey);

  useEffect(() => {
    localStorage.setItem("apiStore", JSON.stringify(apiKey)); // can only save string
  });

  console.log(apiKey);

  return (
    <>
      <div>
        <API apiKey={apiKey} setApiKey={setApiKey} />
        <PlayerContainer apiKey={apiKey} />
        <TeamContainer apiKey={apiKey} />
      </div>
    </>
  );
};

export default OneContainerToRuleThemAll;
