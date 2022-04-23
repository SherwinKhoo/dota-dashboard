import React, { Suspense, useEffect, useState } from "react";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import dotaHub from "./components/images/Dotahub.jpg";

const API = React.lazy(() => import("./components/API"));
const HeroContainer = React.lazy(() =>
  import("./components/hero/HeroContainer")
);
const PlayerContainer = React.lazy(() =>
  import("./components/player/PlayerContainer")
);
const TeamContainer = React.lazy(() =>
  import("./components/team/TeamContainer")
);
const MatchContainer = React.lazy(() =>
  import("./components/match/MatchContainer")
);
const App = () => {
  const [key, setKey] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const apiStore = localStorage.getItem("apiStore");
    if (apiStore) {
      setKey(JSON.parse(apiStore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("apiStore", JSON.stringify(key));
  });

  const handleLogoClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <img
        className="logo"
        src={dotaHub}
        alt="Welcome to DotaHub!"
        onClick={handleLogoClick}
      />
      <div>
        <NavBar />
        <main>
          <Suspense fallback={<p>Did you miscast?</p>}>
            <Routes>
              <Route path="/" element={<Navigate replace to="heroes" />} />
              <Route path="/api" element={<API setKey={setKey} />} />
              <Route path="/heroes" element={<HeroContainer key={key} />} />
              <Route path="/players" element={<PlayerContainer key={key} />} />
              <Route path="/teams" element={<TeamContainer key={key} />} />
              <Route path="/matches" element={<MatchContainer key={key} />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
