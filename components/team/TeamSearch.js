import React from "react";

const TeamSearch = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.fetchTeamList();
    props.setTeamSelection("");
  };

  const handleChange = (event) => {
    props.setTeamSelection(event.target.value);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <button>Load Teams</button>
          <br />
          <br />
          <input
            onChange={handleChange}
            value={props.teamSelection}
            text="text"
            placeholder="Enter team name"
          />
        </form>
      </div>
    </>
  );
};

export default TeamSearch;
