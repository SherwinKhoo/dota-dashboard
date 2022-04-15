import React from "react";

const API = (props) => {
  const handleAPISubmit = (event) => {
    event.preventDefault();
  };

  const handleAPIChange = (event) => {
    props.setKey(event.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleAPISubmit}>
        <input
          className="enterAPI"
          onChange={handleAPIChange}
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
