import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";
import ExploreFilterBar from "./ExploreFilterBar";

export default function Explore({ savedCravingIds, onToggleCraving }) {
  // Created filter for mood thats default is all
  const [moodFilter, setMoodFilter] = useState("all");
  // On the explore page the default for the user profile is null until user makes a profile on 
  // the profile page
  const [userProfile, setUserProfile] = useState(null);

  // Saves users profile once created
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setUserProfile(JSON.parse(stored));
    }
  }, []);

  function matchesProfile(restaurant) {
    if (!userProfile) return false;

    // Through favorite type of cuisine we can narrow down food choices for user
    const favCuisine = userProfile.favoriteCuisine?.toLowerCase().trim();
    // Through budger preference of low, med, or high we can guide user to budget friendly foods
    const budgetPref = userProfile.budget;

    const cuisineMatch =
      favCuisine &&
      ((restaurant.name?.toLowerCase().includes(favCuisine)) ||
        restaurant.tags?.some((t) => t.toLowerCase().includes(favCuisine)));

    const budgetMatch =
      budgetPref &&
      ((budgetPref === "low" && restaurant.price === "$") ||
        (budgetPref === "medium" && restaurant.price === "$$") ||
        (budgetPref === "high" && restaurant.price === "$$$"));

    return !!(cuisineMatch || budgetMatch);
  }

  const filteredRestaurants = RESTAURANTS.filter((spot) => {
    // Matches the users budget preference to the cheap tag
    if (moodFilter === "cheap") {
      return spot.price === "$" || spot.tags.includes("cheap");
    }
    if (moodFilter === "study") {
      return spot.tags.includes("study-spot");
    }
    if (moodFilter === "lateNight") {
      return spot.tags.includes("late-night");
    }
    if (moodFilter === "treat") {
      return spot.tags.includes("dessert") || spot.tags.includes("treat");
    }
    // If none of these preset choices for filtering aren't chosen then all restaurants are shown to the user
    return true; 
  });

  return (
    <div>
      <div className="explore-header">
        <h1>Explore restaurants</h1>
        <p>
          Browse popular spots around campus and save your favorites to your Cravings
          profile.
        </p>
        {userProfile && userProfile.name && (
          <p className="text-muted">
            Showing spots and highlighting matches for {userProfile.name}
            {userProfile.favoriteCuisine &&
              ` (likes ${userProfile.favoriteCuisine} food).`}
          </p>
        )}
      </div>

      <ExploreFilterBar
        moodFilter={moodFilter}
        onMoodFilterChange={setMoodFilter}
      />

      <Row xs={1} md={2} lg={3} className="g-4 mt-1">
        {filteredRestaurants.map((spot) => (
          <Col key={spot.id}>
            <RestaurantCard
              restaurant={spot}
              isSaved={savedCravingIds.includes(spot.id)}
              onToggleCraving={() => onToggleCraving(spot.id)}
              isProfileMatch={matchesProfile(spot)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}