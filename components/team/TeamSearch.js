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
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={props.teamSelection}
          text="text"
          placeholder="Enter team name"
        />
        <button>Search</button>
      </form>
    </>
  );
};

export default TeamSearch;
