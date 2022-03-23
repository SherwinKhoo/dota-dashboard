import React from "react";

const PlayerSearch = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.fetchPlayerList();
    props.setPlayerSelection("");
  };

  const handleChange = (event) => {
    props.setPlayerSelection(event.target.value);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <button>Load Players</button>
          <br />
          <br />
          <input
            className="playerInput"
            onChange={handleChange}
            value={props.playerSelection}
            text="text"
            placeholder="Enter player name"
          />
          <br />
        </form>
      </div>
    </>
  );
};

export default PlayerSearch;
