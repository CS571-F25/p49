import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

const MOODS = {
  // These are the four preset moods for users to choose from 
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

// Different tags used to differentiate restaurants 
const FOOD_TYPE_TAGS = {
  pizza: ["pizza"],
  asian: ["asian", "nepalese"],
  american: ["burgers", "bar-food", "pub-food", "diners", "fast-food"],
  dessert: ["dessert", "ice-cream", "cookies", "sweet-drinks"],
  coffee: ["coffee"],
};

export default function MoodQuiz({ savedCravingIds, onToggleCraving }) {
  // These are the default values for the mood quiz
  const [hungerLevel, setHungerLevel] = useState("meal");
  const [budgetLevel, setBudgetLevel] = useState("medium");
  const [hangoutVibe, setHangoutVibe] = useState("friends");
  const [cravingType, setCravingType] = useState("");
  const [activeMoodKey, setActiveMoodKey] = useState(null);

  // Options for current mood of user
  function figureOutMood() {
    if (hangoutVibe === "study"){
       return "study";
    }
    if (hungerLevel === "snack" && budgetLevel === "high"){ 
      return "treat";
    }
    if (hungerLevel === "very" && budgetLevel !== "high"){ 
      return "late";
    }
    return "cheap";
  }

  // Once quiz is submitted restaurants are filtered and suggestions are made
  function handleQuizSubmit(e) {
    e.preventDefault();
    const moodKey = figureOutMood();
    setActiveMoodKey(moodKey);
  }

  const activeMood = activeMoodKey ? MOODS[activeMoodKey] : null;

  function matchesMood(restaurant) {
    if (!activeMood) return false;
    return restaurant.tags.some((t) => activeMood.tags.includes(t));
  }

  function matchesFoodType(restaurant) {
    if (!cravingType) return true;
    const tagsToMatch = FOOD_TYPE_TAGS[cravingType] || [];
    if (tagsToMatch.length === 0) return true;
    return restaurant.tags.some((t) => tagsToMatch.includes(t));
  }

  const recommendations =
    activeMood &&
    RESTAURANTS.filter(
      (spot) => matchesMood(spot) && matchesFoodType(spot)
    ).slice(0, 9);

  return (
    <div>
      <header className="mb-4">
        <h1>Food Mood Finder</h1>
        <p>
          Answer a few questions and get restaurant suggestions that match your
          current craving.
        </p>
      </header>

      <Form onSubmit={handleQuizSubmit} className="mb-4">
        <Form.Group className="mb-3" controlId="hunger-select">
          <Form.Label>How hungry are you</Form.Label>
          <Form.Select
            value={hungerLevel}
            onChange={(e) => setHungerLevel(e.target.value)}
          >
            <option value="snack">Just a snack</option>
            <option value="meal">Regular meal</option>
            <option value="very">Absolutely starving</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Budget</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              name="budget"
              label="$"
              value="low"
              checked={budgetLevel === "low"}
              onChange={(e) => setBudgetLevel(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              name="budget"
              label="$$"
              value="medium"
              checked={budgetLevel === "medium"}
              onChange={(e) => setBudgetLevel(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              name="budget"
              label="$$$"
              value="high"
              checked={budgetLevel === "high"}
              onChange={(e) => setBudgetLevel(e.target.value)}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="vibe-select">
          <Form.Label>Vibe</Form.Label>
          <Form.Select
            value={hangoutVibe}
            onChange={(e) => setHangoutVibe(e.target.value)}
          >
            <option value="solo">Solo and chill</option>
            <option value="study">Study focused</option>
            <option value="friends">Hanging with friends</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="food-type">
          <Form.Label>What type of food are you craving</Form.Label>
          <Form.Select
            value={cravingType}
            onChange={(e) => setCravingType(e.target.value)}
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

      {activeMood && (
        <section>
          <h2 className="mb-1">{activeMood.label}</h2>
          <p className="mb-3">{activeMood.description}</p>

          {recommendations.length === 0 && (
            <p>No matches found. Try changing your answers.</p>
          )}

          {recommendations.length > 0 && (
            <Row xs={1} md={2} lg={3} className="g-4">
              {recommendations.map((spot) => (
                <Col key={spot.id}>
                  <RestaurantCard
                    restaurant={spot}
                    isSaved={savedCravingIds.includes(spot.id)}
                    onToggleCraving={() => onToggleCraving(spot.id)}
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