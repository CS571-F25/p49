import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";
import ExploreFilterBar from "./ExploreFilterBar";

export default function Explore({ favoriteIds, onToggleFavorite }) {
  const [filter, setFilter] = useState("all");

  const filtered = RESTAURANTS.filter((r) =>
    filter === "late-night" ? r.tags.includes("late-night") : true
  );

  return (
    <div>
      <div className="explore-header">
        <h1>Explore Restaurants</h1>
        <p>
          Browse popular campus spots and save your favorites to your Cravings
          Profile.
        </p>
      </div>

      <ExploreFilterBar filter={filter} setFilter={setFilter} />

      <Row xs={1} md={2} lg={3} className="g-4 mt-1">
        {filtered.map((r) => (
          <Col key={r.id}>
            <RestaurantCard
              restaurant={r}
              isFavorite={favoriteIds.includes(r.id)}
              onToggle={() => onToggleFavorite(r.id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}