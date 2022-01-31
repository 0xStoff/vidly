import React, { useState, useEffect } from "react";
import {
  getMovies,
  deleteMovie,
  getGenres,
  likeMovie,
} from "../services/movieService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import MoviesSite from "../components/moviesSite";

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
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    const genreNames = await getGenres();
    const movies = await getMovies();

    genreNames.sort();
    genreNames.unshift("All Genres");

    setGenres(() => genreNames);
    setMovies(() => movies);
  };

  const handleDelete = (movie) => {
    const remainingMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(() => remainingMovies);
    deleteMovie(movie._id);
  };

  // const handleLike = async (movie) => {
  //   const moviesLiked = [...movies];
  //   const index = moviesLiked.indexOf(movie);
  //   moviesLiked[index] = { ...moviesLiked[index] };

  //   const test = moviesLiked[index].likes.length;
  //   console.log(index);
  //   // console.log(test);
  //   // moviesLiked[index].likes.find((i) => i == index));
  //   const likedMovies = [...movie.likes];

  //   let isLiked = likedMovies.find((id) => id == user.id);

  //   if (!isLiked) moviesLiked[index].likes.push(user.id);
  //   if (isLiked) moviesLiked[index].likes.splice(1);

  //   // console.log(isLiked);
  //   // console.log(moviesLiked[index].likes);
  //   // console.log(test.find(i=> i == index);
  //   // if (moviesLiked[index].find((i) => i == index))
  //   // moviesLiked[index].likes.push(index);
  //   // moviesLiked[index].liked = !moviesLiked[index].liked;
  //   // const id = 111;
  //   // console.log(moviesLiked[index].likes);
  //   setMovies(() => {
  //     return moviesLiked;
  //   });
  //   // likeMovie(moviesLiked[index]);
  // };

  // const index = movie.indexOf(user.id);
  // console.log(index);
  // if (index !== -1) {
  //   // console.log(likedMovies);
  // }
  const handleLike = async (movie) => {
    let likedMovies = [...movie.likes];
    console.log(movie);
    const index = likedMovies.indexOf(user.id);
    // console.log(index);
    let isLiked = likedMovies.find((id) => id == user.id);

    if (!isLiked) likedMovies.push(user.id);
    if (isLiked) {
      if (index !== -1) {
        likedMovies.splice(index, 1);
      }
    }
    // console.log(likedMovies);
    const response = await likeMovie(movie);
    setMovies(() => {
      return response;
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(() => page);
  };

  const handleFilterChange = async (name) => {
    setSearchQuery(() => "");

    let filterMovies = await getMovies();

    if (name != "All Genres") {
      filterMovies = filterMovies.filter((movie) => movie.genre.name == name);
    }
    setCurrentPage(() => 1);
    setMovies(() => filterMovies);
    setCurrentFilter(() => name);
  };

  const handleSearch = async (query) => {
    setCurrentFilter(() => "");
    setSearchQuery(() => query);

    let filterMovies = await getMovies();
    filterMovies = filterMovies.filter((movie) =>
      movie.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
    );
    if (filterMovies.length == 0) return;
    setCurrentPage(() => 1);
    setMovies(() => filterMovies);
  };

  const handleSort = (sort) => {
    setSortColumn(() => {
      return sort;
    });
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
