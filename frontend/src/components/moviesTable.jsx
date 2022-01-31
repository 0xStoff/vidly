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
  const isAuthUser = (movie, loggedIn, notloggedIn) => {
    return user && movie.createdBy.id == user.id ? loggedIn : notloggedIn;
  };

  const isLoggedIn = (loggedIn, notloggedIn) => {
    return user ? loggedIn : notloggedIn;
  };

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        return isAuthUser(
          movie,
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
          movie.title
        );
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: "createdBy.username",
      label: "by",
    },
    {
      key: "like",
      content: (movie) =>
        isLoggedIn(
          <Like
            likes={movie.likes}
            liked={movie.liked}
            onClick={() => onLike(movie)}
          />,
          <Like likes={movie.likes} liked={movie.liked} />
        ),
    },
    {
      key: "delete",
      content: (movie) =>
        isAuthUser(
          movie,
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

  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
