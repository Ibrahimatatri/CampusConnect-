export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search by event, room, or building"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
