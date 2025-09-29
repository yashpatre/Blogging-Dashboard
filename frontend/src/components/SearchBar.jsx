export default function SearchBar({ value, onChange }) {
  return (
    <div className="hidden md:flex flex-1 mx-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search blogs..."
        className="bb-input rounded-full"
      />
    </div>
  );
}
