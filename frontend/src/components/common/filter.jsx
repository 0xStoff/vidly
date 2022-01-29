const FilterMovies = ({ onFilterChange, currentFilter, genres }) => {
  // const filters = ["All Genres", "Action", "Comedy", "Thriller"];

  const filters = genres;
  // filters.push("All Genres");

  const filterClass = "list-group-item clickable";
  return (
    <ul className="list-group">
      {filters.map((filter) => (
        <li
          key={filter}
          onClick={() => {
            onFilterChange(filter);
          }}
          className={
            filter === currentFilter ? `${filterClass} active` : filterClass
          }
        >
          {filter}
        </li>
      ))}
    </ul>
  );
};

export default FilterMovies;
