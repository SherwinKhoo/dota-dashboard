import React from "react";
import PlayerContainer from "./components/player/PlayerContainer";
import TeamContainer from "./components/team/TeamContainer";

function App() {
  return (
    <div>
      <h2>Dota Dashboard</h2>
      <div className="appContainers">
        <PlayerContainer />
      </div>
      <div className="appContainers">
        <TeamContainer />
      </div>
    </div>
  );
}

export default App;
