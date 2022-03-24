import React, { Suspense } from "react";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import dotaHub from "./components/images/Dotahub.jpg";

const PageAPI = React.lazy(() => import("./components/pages/PageAPI"));
const PageHero = React.lazy(() => import("./components/pages/PageHero"));
const PagePlayer = React.lazy(() => import("./components/pages/PagePlayer"));
const PageTeam = React.lazy(() => import("./components/pages/PageTeam"));

const App = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/api";
    navigate(path);
  };

  return (
    <div>
      <img
        className="logo"
        src={dotaHub}
        alt="Welcome to DotaHub!"
        onClick={routeChange}
      />
      <div>
        <NavBar />
        <main>
          <Suspense fallback={<p>Did you miscast?</p>}>
            <Routes>
              <Route path="/" element={<Navigate replace to="hero" />} />
              <Route path="/api" element={<PageAPI />} />
              <Route path="/search-hero" element={<PageHero />} />
              <Route
                path="/search-player-recent-matches"
                element={<PagePlayer />}
              />
              <Route path="/search-team-matches" element={<PageTeam />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
