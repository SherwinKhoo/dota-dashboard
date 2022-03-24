import React, { useState } from "react";
import API from "./API";
import PlayerContainer from "./player/PlayerContainer";
import TeamContainer from "./team/TeamContainer";

const OneContainerToRuleThemAll = () => {
  const [apiKey, setApiKey] = useState("");

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
