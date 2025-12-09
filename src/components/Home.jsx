import { useState, useEffect } from "react";
import { Button, Badge, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

// These are the restaurants shown on the home page to give the user a preview of some restaurants based
// on mood before entering the explore page with all the restaurants
const CRAVINGS = {
  cheap: {
    label: "Cheap and Fast",
    tagline: "Quick bites that do not hurt the wallet.",
    spots: [
      { name: "Ian's Pizza", note: "Mac and Cheese pizza legend." },
      { name: "McDonald's", note: "Reliable and fast classic." },
      { name: "Paul's Pel'meni", note: "Warm dumplings and comfort food." },
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
      { name: "Raising Cane's", note: "Chicken fingers equal instant happiness." },
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

function buildProfileRecommendations(userProfile) {
  if (!userProfile){ 
    return [];
  }

  const favCuisine = userProfile.favoriteCuisine
    ? userProfile.favoriteCuisine.toLowerCase().trim()
    : "";
  const budgetPref = userProfile.budget;

  let options = RESTAURANTS;

  if (favCuisine) {
    const byCuisine = options.filter((spot) => {
      const nameMatch = spot.name.toLowerCase().includes(favCuisine);
      const tagMatch = spot.tags.some((t) =>
        t.toLowerCase().includes(favCuisine)
      );
      return nameMatch || tagMatch;
    });
    if (byCuisine.length > 0) {
      options = byCuisine;
    }
  }

  // Ensures that low only shows low prices while medium and higher show their level prices and lower
  if (budgetPref) {
    let allowedPrices;
    if (budgetPref === "low"){ 
      allowedPrices = ["$"];
    }
    else if (budgetPref === "medium"){
       allowedPrices = ["$", "$$"];
      }
    else if (budgetPref === "high"){
       allowedPrices = ["$", "$$", "$$$"];
    }
    else {
      allowedPrices = null;
    }

    if (allowedPrices) {
      const byBudget = options.filter((spot) =>
        allowedPrices.includes(spot.price)
      );
      if (byBudget.length > 0) {
        options = byBudget;
      }
    }
  }

  if (options.length === 0 || (!favCuisine && !budgetPref)) {
    return [];
  }

  return options.slice(0, 3);
}

export default function Home({ savedCravingIds = [], onToggleCraving }) {
  const [activeCravingKey, setActiveCravingKey] = useState("cheap");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setUserProfile(JSON.parse(stored));
    }
  }, []);

  const activeCraving = CRAVINGS[activeCravingKey];
  const profileRecommendations = buildProfileRecommendations(userProfile);

  return (
    <div>
      {/* hero section */}
      <section className="hero">
        <div className="hero-pill">Hungry on Campus</div>

        <h1 className="hero-title">Campus Cravings</h1>

        <p className="hero-subtitle">
          {userProfile && userProfile.name ? (
            <>
              Welcome {userProfile.name}. Here are the best places around campus for students who enjoy{" "}
              {userProfile.favoriteCuisine || "good food"}.
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
                variant={key === activeCravingKey ? "danger" : "outline-secondary"}
                size="sm"
                className="me-2 mb-2"
                onClick={() => setActiveCravingKey(key)}
              >
                {value.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* craving results */}
      <section className="craving-results">
        <h2 className="craving-heading">{activeCraving.label}</h2>
        <p className="craving-tagline">{activeCraving.tagline}</p>

        <ul className="craving-list">
          {activeCraving.spots.map((spot) => (
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
          {userProfile ? (
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

        {userProfile && profileRecommendations.length > 0 && (
          <Row xs={1} md={3} className="g-4">
            {profileRecommendations.map((spot) => (
              <Col key={spot.id}>
                <RestaurantCard
                  restaurant={spot}
                  isSaved={savedCravingIds.includes(spot.id)}
                  onToggleCraving={() => onToggleCraving?.(spot.id)}
                />
              </Col>
            ))}
          </Row>
        )}

        {userProfile && profileRecommendations.length === 0 && (
          <p className="craving-tagline">
            We didn't find clear matches yet. Try adding your favorite cuisine
            or budget on your <Link to="/profile">Profile Page</Link>.
          </p>
        )}
      </section>
    </div>
  );
}