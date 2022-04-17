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
        <form onSubmit={handleSubmit} className="row">
          <button className="col-md-4">Reload</button>
          <input
            className="playerInput col-md-8"
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
