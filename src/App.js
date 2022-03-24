import React, { Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import dotaHub from "./components/images/Dotahub.jpg";

const PageAPI = React.lazy(() => import("./components/pages/PageAPI"));
const PageHero = React.lazy(() => import("./components/pages/PageHero"));
const PagePlayer = React.lazy(() => import("./components/pages/PagePlayer"));
const PageTeam = React.lazy(() => import("./components/pages/PageTeam"));

function App() {
  return (
    <div>
      <img className="logo" src={dotaHub} alt="Welcome to DotaHub!" />
      <div>
        <NavBar />
        <main>
          <Suspense fallback={<p>Did you miscast?</p>}>
            <Routes>
              <Route path="/" element={<Navigate replace to="api" />} />
              <Route path="/api" element={<PageAPI />} />
              <Route path="/hero" element={<PageHero />} />
              <Route path="/player" element={<PagePlayer />} />
              <Route path="/team" element={<PageTeam />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
