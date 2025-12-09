import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

export default function Profile({ favoriteIds, onToggleFavorite }) {
  const [profile, setProfile] = useState({
    name: "",
    favoriteCuisine: "",
    budget: "",
    bio: "",
  });
  const [hasSaved, setHasSaved] = useState(false);

  // Load profile from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
      setHasSaved(true);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setHasSaved(true);
  }

  const favorites = RESTAURANTS.filter((r) => favoriteIds.includes(r.id));

  return (
    <div>
      <h1>Your Campus Cravings profile</h1>

      {/* Create or edit profile section */}
      <section className="mb-4">
        <h2 className="h4">Create or update your profile</h2>
        <p className="text-muted">
          Tell us a little about yourself so suggestions feel more personal.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="profile-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profile-cuisine">
            <Form.Label>Favorite cuisine</Form.Label>
            <Form.Control
              type="text"
              name="favoriteCuisine"
              value={profile.favoriteCuisine}
              onChange={handleChange}
              placeholder="Example Thai, pizza, coffee and pastries"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profile-budget">
            <Form.Label>Typical budget</Form.Label>
            <Form.Select
              name="budget"
              value={profile.budget}
              onChange={handleChange}
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
              value={profile.bio}
              onChange={handleChange}
              placeholder="Example Food focused student at UW Madison who loves late night snacks and study cafes"
            />
          </Form.Group>

          <Button type="submit" variant="danger">
            Save profile
          </Button>

          {hasSaved && (
            <span className="ms-2 text-success" aria-live="polite">
              Profile saved
            </span>
          )}
        </Form>

        {hasSaved && (
          <div className="mt-3">
            <p>
              <strong>Quick summary</strong>{" "}
              {profile.name && <>for {profile.name}</>}
            </p>
            <ul>
              {profile.favoriteCuisine && (
                <li>Likes {profile.favoriteCuisine} spots.</li>
              )}
              {profile.budget && <li>Usual budget: {profile.budget}.</li>}
              {profile.bio && <li>{profile.bio}</li>}
            </ul>
          </div>
        )}
      </section>

      {/* Saved spots section */}
      <section>
        <h2 className="h4">Your saved spots</h2>
        {favorites.length === 0 ? (
          <p className="profile-empty">
            You have not saved any spots yet. Visit the Explore page to add
            places to your Cravings.
          </p>
        ) : (
          <>
            <p className="mb-3">
              These are the spots you added to your Campus Cravings list.
            </p>
            {favorites.map((r) => (
              <div className="mb-3" key={r.id}>
                <RestaurantCard
                  restaurant={r}
                  isFavorite={true}
                  onToggle={() => onToggleFavorite(r.id)}
                />
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
}
