import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import About from "./components/About";
import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer";

function App() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function toggleFavorite(id) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavoriteIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  return (
    <HashRouter>
      <div className="app-root">
        <NavbarMain />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
