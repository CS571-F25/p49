import { useState, useEffect } from "react";
import { Button, Badge, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

const CRAVINGS = {
  cheap: {
    label: "Cheap and Fast",
    tagline: "Quick bites that do not hurt the wallet.",
    spots: [
      { name: "Ian's Pizza", note: "Mac and Cheese pizza legend." },
      { name: "McDonald's", note: "Reliable and fast classic." },
      { name: "Paul’s Pel’meni", note: "Warm dumplings and comfort food." },
    ],
  },
  study: {
    label: "Study Snacks",
    tagline: "Good vibes, wifi, and snacks to keep you going.",
    spots: [
      {
        name: "Taiwan Little Eats",
        note: "Snacks and milk tea that help you focus.",
      },
      {
        name: "Colectivo Coffee",
        note: "Big tables and pastries for long sessions.",
      },
      { name: "Starbucks", note: "A familiar caffeine home base." },
    ],
  },
  lateNight: {
    label: "Late Night",
    tagline: "When Canvas is still open and you need fuel.",
    spots: [
      { name: "Toppers", note: "Breadsticks past midnight hit different." },
      { name: "Conrad's", note: "Chill late night pub bites." },
      { name: "Raising Cane’s", note: "Chicken fingers equal instant happiness." },
    ],
  },
  treat: {
    label: "Treat Yourself",
    tagline: "A sweet reward after a long day. You deserve it.",
    spots: [
      { name: "Chocolate Shoppe", note: "Ice cream that never misses." },
      { name: "Insomnia Cookies", note: "Warm cookies delivered late." },
      { name: "Candy Cloud", note: "Colorful treats for pure serotonin." },
    ],
  },
};

// build a short list of recommended places from the profile
function buildRecommendations(profile) {
  if (!profile) return [];

  const fav = profile.favoriteCuisine
    ? profile.favoriteCuisine.toLowerCase().trim()
    : "";
  const budget = profile.budget;

  let list = RESTAURANTS;

  if (fav) {
    const cuisineFiltered = list.filter((r) => {
      const nameMatch = r.name.toLowerCase().includes(fav);
      const tagMatch = r.tags.some((t) => t.toLowerCase().includes(fav));
      return nameMatch || tagMatch;
    });
    if (cuisineFiltered.length > 0) {
      list = cuisineFiltered;
    }
  }

  if (budget) {
    let allowedPrices;
    if (budget === "low") allowedPrices = ["$"];
    else if (budget === "medium") allowedPrices = ["$", "$$"];
    else if (budget === "high") allowedPrices = ["$", "$$", "$$$"];
    else allowedPrices = null;

    if (allowedPrices) {
      const budgetFiltered = list.filter((r) => allowedPrices.includes(r.price));
      if (budgetFiltered.length > 0) {
        list = budgetFiltered;
      }
    }
  }

  if (list.length === 0 || (!fav && !budget)) {
    return [];
  }

  return list.slice(0, 3);
}

export default function Home({ favoriteIds = [], onToggleFavorite }) {
  const [cravingKey, setCravingKey] = useState("cheap");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const craving = CRAVINGS[cravingKey];
  const recommended = buildRecommendations(profile);

  return (
    <div>
      {/* hero section */}
      <section className="hero">
        <div className="hero-pill">Hungry on Campus</div>

        <h1 className="hero-title">Campus Cravings</h1>

        <p className="hero-subtitle">
          {profile && profile.name ? (
            <>
              Welcome {profile.name}. Here are the best places around UW Madison
              for students who enjoy{" "}
              {profile.favoriteCuisine || "good food"}.
            </>
          ) : (
            "Discover the best bites around UW Madison campus. Find food that matches your mood."
          )}
        </p>

        <Button
          as={Link}
          to="/mood"
          variant="danger"
          size="lg"
          className="mt-3"
        >
          Take the Food Mood Quiz
        </Button>

        <div className="craving-controls">
          <p className="craving-label">What are you in the mood for</p>
          <div className="craving-buttons">
            {Object.entries(CRAVINGS).map(([key, value]) => (
              <Button
                key={key}
                variant={key === cravingKey ? "danger" : "outline-secondary"}
                size="sm"
                className="me-2 mb-2"
                onClick={() => setCravingKey(key)}
              >
                {value.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* craving results */}
      <section className="craving-results">
        <h2 className="craving-heading">{craving.label}</h2>
        <p className="craving-tagline">{craving.tagline}</p>

        <ul className="craving-list">
          {craving.spots.map((spot) => (
            <li key={spot.name} className="craving-item">
              <span className="craving-spot-name">{spot.name}</span>
              <Badge bg="light" text="dark" className="ms-2">
                {spot.note}
              </Badge>
            </li>
          ))}
        </ul>
      </section>

      {/* profile based recommendations */}
      <section className="mt-4">
        <div className="explore-header">
          <h2 className="craving-heading">Places picked for you</h2>
          {profile ? (
            <p className="craving-tagline">
              Suggestions based on your Campus Cravings profile.
            </p>
          ) : (
            <p className="craving-tagline">
              Create your profile to see personal suggestions here. Visit the{" "}
              <Link to="/profile">profile page</Link> to start.
            </p>
          )}
        </div>

        {profile && recommended.length > 0 && (
          <Row xs={1} md={3} className="g-4">
            {recommended.map((r) => (
              <Col key={r.id}>
                <RestaurantCard
                  restaurant={r}
                  isFavorite={favoriteIds.includes(r.id)}
                  onToggle={() => onToggleFavorite?.(r.id)}
                />
              </Col>
            ))}
          </Row>
        )}

        {profile && recommended.length === 0 && (
          <p className="craving-tagline">
            We did not find clear matches yet. Try adding your favorite cuisine
            or budget on your{" "}
            <Link to="/profile">profile page</Link>.
          </p>
        )}
      </section>
    </div>
  );
}
