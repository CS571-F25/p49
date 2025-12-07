export default function ExploreFilterBar({ filter, setFilter }) {
  return (
    <div className="mb-3">
      <label htmlFor="filter-select" className="form-label">
        Filter by mood
      </label>
      <select
        id="filter-select"
        className="form-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All spots</option>
        <option value="late-night">Late-night</option>
      </select>
    </div>
  );
}