export default function ExploreFilterBar({ moodFilter, onMoodFilterChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="filter-select" className="form-label">
        Filter By Cravings!
      </label>
      <select
        id="filter-select"
        className="form-select"
        value={moodFilter}
        onChange={(e) => onMoodFilterChange(e.target.value)}
        // Mood filter is used for this filter bar to only show user restaurants
        // they would prefer at the moment
      >
        <option value="all">All spots</option>
        <option value="cheap">Cheap &amp; Fast</option>
        <option value="study">Study Snacks</option>
        <option value="lateNight">Late Night</option>
        <option value="treat">Treat Yourself</option>
      </select>
    </div>
  );
}