import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

// Map quiz moods to tags that already exist in RESTAURANTS
const MOODS = {
  cheap: {
    label: "Cheap and Fast",
    description: "Quick and budget friendly food.",
    tags: ["cheap"],
  },
  study: {
    label: "Study Session",
    description: "Calm places with snacks, drinks, and wifi.",
    tags: ["study-spot"],
  },
  late: {
    label: "Late Night",
    description: "Food that still works when Canvas is open at midnight.",
    tags: ["late-night"],
  },
  treat: {
    label: "Treat Yourself",
    description: "Dessert and reward food after a long day.",
    tags: ["dessert", "treat"],
  },
};

// Map quiz food type answers to tag sets that already exist in RESTAURANTS
const FOOD_TYPE_TAGS = {
  pizza: ["pizza"],
  asian: ["asian", "nepalese"],
  american: ["burgers", "bar-food", "pub-food", "diners", "fast-food"],
  dessert: ["dessert", "ice-cream", "cookies", "sweet-drinks"],
  coffee: ["coffee"],
};

export default function MoodQuiz({ favoriteIds, onToggleFavorite }) {
  const [hunger, setHunger] = useState("meal");
  const [budget, setBudget] = useState("medium");
  const [vibe, setVibe] = useState("friends");
  const [foodType, setFoodType] = useState("");
  const [resultKey, setResultKey] = useState(null);

  function determineMood() {
    if (vibe === "study") return "study";
    if (hunger === "snack" && budget === "high") return "treat";
    if (hunger === "very" && budget !== "high") return "late";
    return "cheap";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const mood = determineMood();
    setResultKey(mood);
  }

  const result = resultKey ? MOODS[resultKey] : null;

  function matchesMood(restaurant) {
    if (!result) return false;
    return restaurant.tags.some((t) => result.tags.includes(t));
  }

  function matchesFoodType(restaurant) {
    if (!foodType) return true; // any type is fine
    const tagsToMatch = FOOD_TYPE_TAGS[foodType] || [];
    if (tagsToMatch.length === 0) return true;
    return restaurant.tags.some((t) => tagsToMatch.includes(t));
  }

  const recommended =
    result &&
    RESTAURANTS.filter((r) => matchesMood(r) && matchesFoodType(r)).slice(
      0,
      9
    );

  return (
    <div>
      <header className="mb-4">
        <h1>Food Mood Finder</h1>
        <p>
          Answer a few questions and get restaurant suggestions that match your
          current craving.
        </p>
      </header>

      <Form onSubmit={handleSubmit} className="mb-4">
        {/* Hunger */}
        <Form.Group className="mb-3" controlId="hunger-select">
          <Form.Label>How hungry are you</Form.Label>
          <Form.Select
            value={hunger}
            onChange={(e) => setHunger(e.target.value)}
          >
            <option value="snack">Just a snack</option>
            <option value="meal">Regular meal</option>
            <option value="very">Absolutely starving</option>
          </Form.Select>
        </Form.Group>

        {/* Budget */}
        <Form.Group className="mb-3">
          <Form.Label>Budget</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              name="budget"
              label="$"
              value="low"
              checked={budget === "low"}
              onChange={(e) => setBudget(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              name="budget"
              label="$$"
              value="medium"
              checked={budget === "medium"}
              onChange={(e) => setBudget(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              name="budget"
              label="$$$"
              value="high"
              checked={budget === "high"}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </Form.Group>

        {/* Vibe */}
        <Form.Group className="mb-3" controlId="vibe-select">
          <Form.Label>Vibe</Form.Label>
          <Form.Select
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
          >
            <option value="solo">Solo and chill</option>
            <option value="study">Study focused</option>
            <option value="friends">Hanging with friends</option>
          </Form.Select>
        </Form.Group>

        {/* Type of food */}
        <Form.Group className="mb-3" controlId="food-type">
          <Form.Label>What type of food are you craving</Form.Label>
          <Form.Select
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
          >
            <option value="">Any type</option>
            <option value="pizza">Pizza</option>
            <option value="asian">Asian inspired</option>
            <option value="american">American comfort</option>
            <option value="dessert">Dessert or sweet</option>
            <option value="coffee">Coffee and pastries</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="danger">
          Show my spots
        </Button>
      </Form>

      {/* Results */}
      {result && (
        <section>
          <h2 className="mb-1">{result.label}</h2>
          <p className="mb-3">{result.description}</p>

          {recommended.length === 0 && (
            <p>No matches found. Try changing your answers.</p>
          )}

          {recommended.length > 0 && (
            <Row xs={1} md={2} lg={3} className="g-4">
              {recommended.map((r) => (
                <Col key={r.id}>
                  <RestaurantCard
                    restaurant={r}
                    isFavorite={favoriteIds.includes(r.id)}
                    onToggle={() => onToggleFavorite(r.id)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </section>
      )}
    </div>
  );
}
