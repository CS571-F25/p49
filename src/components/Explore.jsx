import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";
import ExploreFilterBar from "./ExploreFilterBar";

export default function Explore({ favoriteIds, onToggleFavorite }) {
  const [filter, setFilter] = useState("all");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const filtered = RESTAURANTS.filter((r) =>
    filter === "lateNight" ? r.tags.includes("lateNight") : true
  );

  function matchesProfile(restaurant) {
    if (!profile) return false;

    const cuisineMatch =
      profile.favoriteCuisine &&
      restaurant.cuisine &&
      restaurant.cuisine
        .toLowerCase()
        .includes(profile.favoriteCuisine.toLowerCase());

    const budgetMatch =
      profile.budget &&
      ((profile.budget === "low" && restaurant.price === "$") ||
        (profile.budget === "medium" && restaurant.price === "$$") ||
        (profile.budget === "high" && restaurant.price === "$$$"));

    return cuisineMatch || budgetMatch;
  }

  return (
    <div>
      <div className="explore-header">
        <h1>Explore restaurants</h1>
        <p>
          Browse popular campus spots and save your favorites to your Cravings
          profile.
        </p>
        {profile && profile.name && (
          <p className="text-muted">
            Showing spots and marking matches for {profile.name}
            {profile.favoriteCuisine &&
              ` who likes ${profile.favoriteCuisine} food.`}
          </p>
        )}
      </div>

      <ExploreFilterBar filter={filter} setFilter={setFilter} />

      <Row xs={1} md={2} lg={3} className="g-4 mt-1">
        {filtered.map((r) => (
          <Col key={r.id}>
            <RestaurantCard
              restaurant={r}
              isFavorite={favoriteIds.includes(r.id)}
              onToggle={() => onToggleFavorite(r.id)}
              highlight={matchesProfile(r)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
