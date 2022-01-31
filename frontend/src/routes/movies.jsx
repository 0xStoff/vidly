import React, { useState, useEffect } from "react";
import {
  getMovies,
  deleteMovie,
  getGenres,
  likeMovie,
  setLikeByUser,
} from "../services/movieService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import MoviesSite from "../components/moviesSite";
import { toast } from "react-toastify";

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("All Genres");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const genreNames = await getGenres();
    const movies = await getMovies();

    genreNames.sort();
    genreNames.unshift("All Genres");

    setGenres(genreNames);
    setMovies(movies);
  };

  const handleDelete = (movie) => {
    const remainingMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(remainingMovies);
    deleteMovie(movie._id);
  };

  const handleLike = async (movie) => {
    const allMovies = setLikeByUser(user, movie, movies);
    // let likedMovies = [...movie.likes];
    // const index = likedMovies.indexOf(user.id);
    // let isLiked = likedMovies.find((id) => id == user.id);
    // if (!isLiked) likedMovies.push(user.id);
    // else {
    //   likedMovies.splice(index, 1);
    // }

    // let allMovies = [...movies];
    // const movieIndex = allMovies.indexOf(movie);
    // allMovies[movieIndex].likes = likedMovies;

    setMovies(allMovies);
    try {
      await likeMovie(movie);
    } catch (err) {
      toast.error("Movie has already been deleted");
      throw err;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = async (name) => {
    setSearchQuery("");

    let filterMovies = await getMovies();

    if (name != "All Genres") {
      filterMovies = filterMovies.filter((movie) => movie.genre.name == name);
    }
    setCurrentPage(1);
    setMovies(filterMovies);
    setCurrentFilter(name);
  };

  const handleSearch = async (query) => {
    setCurrentFilter("");
    setSearchQuery(query);

    let filterMovies = await getMovies();
    filterMovies = filterMovies.filter((movie) =>
      movie.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
    );
    if (filterMovies.length == 0) return;
    setCurrentPage(1);
    setMovies(filterMovies);
  };

  const handleSort = (sort) => {
    setSortColumn(sort);
  };

  const getPageData = () => {
    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);
    const moviesPaginate = paginate(sorted, currentPage, pageSize);

    return { totalCount: movies.length, data: moviesPaginate };
  };

  const { totalCount, data } = getPageData();

  return (
    <MoviesSite
      genres={genres}
      currentFilter={currentFilter}
      onFilterChange={handleFilterChange}
      totalCount={totalCount}
      data={data}
      onDelete={handleDelete}
      onLike={handleLike}
      onSort={handleSort}
      sortColumn={sortColumn}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      searchQuery={searchQuery}
      user={user}
    />
  );
};

// export const onLike = (movie) => {
//   console.log(movie);
//   // Movies.handleLike(movie);
// };

export default Movies;
