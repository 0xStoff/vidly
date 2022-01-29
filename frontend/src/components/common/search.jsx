const SearchBox = ({ onChange, searchQuery }) => {
  return (
    <input
      className="form-control w-50 mb-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={(e) => onChange(e.target.value)}
      value={searchQuery}
    />
  );
};
export default SearchBox;
