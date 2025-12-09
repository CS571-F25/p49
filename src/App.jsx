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
  // initialize from localStorage once
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  function toggleFavorite(id) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // persist only when favorites actually change
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favoriteIds));
    } catch {
      // ignore storage errors in dev
    }
  }, [favoriteIds]);

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
      favoriteIds={favoriteIds}
      onToggleFavorite={toggleFavorite}
    />
  }
/>

            <Route
              path="/explore"
              element={
                <Explore
                  favoriteIds={favoriteIds}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  favoriteIds={favoriteIds}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/mood"
              element={
                <MoodQuiz
                  favoriteIds={favoriteIds}
                  onToggleFavorite={toggleFavorite}
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
