import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

export default function Profile({ savedCravingIds, onToggleCraving }) {
  // Sets default blank values for users profile until profile is actually created
  const [userProfile, setUserProfile] = useState({
    name: "",
    favoriteCuisine: "",
    budget: "",
    bio: "",
  });
  const [hasSavedProfile, setHasSavedProfile] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setUserProfile(JSON.parse(stored));
      setHasSavedProfile(true);
    }
  }, []);

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Saves and updates profile once submitted
  function handleProfileSubmit(e) {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    setHasSavedProfile(true);
  }

  // Uses profile to filter through restaurants that match mood
  const favoriteSpots = RESTAURANTS.filter((spot) =>
    savedCravingIds.includes(spot.id)
  );

  return (
    <div>
      <h1>Your Campus Cravings profile</h1>

      <section className="mb-4">
        <h2 className="h4">Create or update your profile</h2>
        <p className="text-muted">
          Tell us a little about yourself so suggestions feel more personal!
        </p>

        <Form onSubmit={handleProfileSubmit}>
          <Form.Group className="mb-3" controlId="profile-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userProfile.name}
              onChange={handleFieldChange}
              placeholder="Your name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profile-cuisine">
            <Form.Label>Favorite cuisine</Form.Label>
            <Form.Control
              type="text"
              name="favoriteCuisine"
              value={userProfile.favoriteCuisine}
              onChange={handleFieldChange}
              placeholder="For example Thai, pizza, coffee and pastries"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profile-budget">
            <Form.Label>Typical budget</Form.Label>
            <Form.Select
              name="budget"
              value={userProfile.budget}
              onChange={handleFieldChange}
            >
              <option value="">Select an option</option>
              <option value="low">$ student save mode</option>
              <option value="medium">$$ sometimes treat myself</option>
              <option value="high">$$$ big splurge</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="profile-bio">
            <Form.Label>Short food bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={userProfile.bio}
              onChange={handleFieldChange}
              placeholder="For example food focused student at UW Madison who loves late night snacks and study cafes"
            />
          </Form.Group>

          <Button type="submit" variant="danger">
            Save profile
          </Button>

          {hasSavedProfile && (
            <span className="ms-2 text-success" aria-live="polite">
              Profile saved
            </span>
          )}
        </Form>

        {hasSavedProfile && (
          <div className="mt-3">
            <p>
              <strong>Quick summary</strong>{" "}
              {userProfile.name && <>for {userProfile.name}</>}
            </p>
            <ul>
              {userProfile.favoriteCuisine && (
                <li>Likes {userProfile.favoriteCuisine} spots.</li>
              )}
              {userProfile.budget && <li>Usual budget: {userProfile.budget}.</li>}
              {userProfile.bio && <li>{userProfile.bio}</li>}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h2 className="h4">Your saved spots</h2>
        {favoriteSpots.length === 0 ? (
          <p className="profile-empty">
            You have not saved any spots yet. Visit the Explore page to add
            places to your Cravings.
          </p>
        ) : (
          <>
            <p className="mb-3">
              These are the spots you added to your Campus Cravings list.
            </p>
            {favoriteSpots.map((spot) => (
              <div className="mb-3" key={spot.id}>
                <RestaurantCard
                  restaurant={spot}
                  isSaved={true}
                  onToggleCraving={() => onToggleCraving(spot.id)}
                />
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
}