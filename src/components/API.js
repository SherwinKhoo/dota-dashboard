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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          className="enterAPI"
          onChange={handleChange}
          value={props.apiKey}
          text="text"
          type="password"
          placeholder="Enter API key"
        />
        <button>Save API key</button>
      </form>
    </div>
  );
};

export default API;
