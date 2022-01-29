import React from "react";
import Pagination from "./common/pagination";
import FilterMovies from "./common/filter";
import MoviesTable from "./moviesTable";
import { useNavigate } from "react-router-dom";
import SearchBox from "./common/search";
import { Badge } from "react-bootstrap";

const MoviesSite = ({
  currentFilter,
  onFilterChange,
  totalCount,
  data,
  onDelete,
  onLike,
  onSort,
  sortColumn,
  pageSize,
  currentPage,
  onPageChange,
  onSearch,
  searchQuery,
  genres,
  user,
}) => {
  const navigate = useNavigate();
  // const user = getCurrentUser();

  return (
    <React.Fragment>
      {!user && (
        <Badge bg="" className="customBadge">
          Please Login or Register first to make changes{" "}
        </Badge>
      )}
      <div className="row mt-5">
        <div className="col-3">
          <FilterMovies
            genres={genres}
            currentFilter={currentFilter}
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="col-9">
          <SearchBox searchQuery={searchQuery} onChange={onSearch} />
          <button
            className="btn button mb-4"
            onClick={() => {
              navigate("/movies/new");
            }}
            disabled={!user}
          >
            Add Movie
          </button>
          <br />
          {!data.length ? (
            <label className="w-75">There are no movies in the database</label>
          ) : (
            <React.Fragment>
              <label>Showing {totalCount} movies in database</label>
              <MoviesTable
                movies={data}
                onDelete={onDelete}
                onLike={onLike}
                onSort={onSort}
                sortColumn={sortColumn}
                user={user}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MoviesSite;
