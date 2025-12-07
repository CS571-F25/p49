import { RESTAURANTS } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

export default function Profile({ favoriteIds, onToggleFavorite }) {
  const favorites = RESTAURANTS.filter((r) => favoriteIds.includes(r.id));

  return (
    <div>
      <h1>Your Cravings Profile</h1>
      {favorites.length === 0 ? (
        <p>
          You haven’t saved any spots yet. Visit the Explore page to add places
          to your Cravings.
        </p>
      ) : (
        <>
          <p className="mb-3">
            These are the spots you’ve added to your Campus Cravings list.
          </p>
          {favorites.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              isFavorite={true}
              onToggle={() => onToggleFavorite(r.id)}
            />
          ))}
        </>
      )}
    </div>
  );
}