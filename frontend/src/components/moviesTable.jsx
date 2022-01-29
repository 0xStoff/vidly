import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import React from "react";

const MoviesTable = ({
  movies,
  onDelete,
  onLike,
  sortColumn,
  onSort,
  user,
}) => {
  const isLoggedIn = (loggedIn, notloggedIn) => {
    return user ? loggedIn : notloggedIn;
  };

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) =>
        isLoggedIn(
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
          movie.title
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) =>
        isLoggedIn(
          <Like liked={movie.liked} onClick={() => onLike(movie)} />,
          <Like liked={movie.liked} />
        ),
    },
    {
      key: "delete",
      content: (movie) =>
        isLoggedIn(
          <button
            className="btn btn-sm deleteButton"
            onClick={() => {
              onDelete(movie);
            }}
          >
            <i className="fa fa-minus" />
          </button>,
          <button className="btn btn-sm deleteButton">
            <i className="fa fa-minus" />
          </button>
        ),
    },
  ];

  return isLoggedIn(
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />,
    <React.Fragment>
      <Table
        columns={columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </React.Fragment>
  );
};

export default MoviesTable;
