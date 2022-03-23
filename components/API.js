import React from "react";

const API = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setApiKey("");
  };

  const handleChange = (event) => {
    props.setApiKey(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={props.apiKey}
          text="text"
          placeholder="Enter API key"
        ></input>
        <button>Save API key</button>
      </form>
    </>
  );
};

export default API;
