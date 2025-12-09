import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import About from "./components/About";
import MoodQuiz from "./components/MoodQuiz";
import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer";

function App() {
  // Saves restaurants user added to cravings in an array; list of cravings are shown if
  // there are some saved or nothing is shown if none are saved
  const [savedCravingIds, setSavedCravingIds] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  function handleToggleCraving(id) {
    setSavedCravingIds((prev) =>
      prev.includes(id) ? prev.filter((spotId) => spotId !== id) : [...prev, id]
    );
  }

  // useEffect allows us to store the favorited restaurant
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(savedCravingIds));
    } catch {
    }
  }, [savedCravingIds]);

  return (
    <HashRouter>
      <div className="app-root">
        <NavbarMain />
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  savedCravingIds={savedCravingIds}
                  onToggleCraving={handleToggleCraving}
                />
              }
            />
            <Route
              path="/explore"
              element={
                <Explore
                  savedCravingIds={savedCravingIds}
                  onToggleCraving={handleToggleCraving}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  savedCravingIds={savedCravingIds}
                  onToggleCraving={handleToggleCraving}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/mood"
              element={
                <MoodQuiz
                  savedCravingIds={savedCravingIds}
                  onToggleCraving={handleToggleCraving}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;