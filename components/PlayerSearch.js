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
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={props.playerSelection}
          text="text"
          placeholder="Enter player name"
        />
        <button>Search</button>
      </form>
    </>
  );
};

export default PlayerSearch;
