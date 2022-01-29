import httpService from "./httpService";
import { toast } from "react-toastify";
import config from "../config.json";

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/movies`;

function getUrl(id) {
  return `${apiEndpoint}/${id}`;
}

async function addMovie(movie) {
  try {
    const { data: added } = await httpService.post(apiEndpoint, movie);
    const { title } = added.data.attributes;
    toast.success(`${title} successfully added`);
  } catch (err) {
    throw err;
  }
}
async function updateMovie(movie, id) {
  try {
    const { data: updated } = await httpService.put(getUrl(id), movie);
    const { title } = updated.data.attributes;
    toast.success(`${title} successfully updated`);
  } catch (err) {
    throw err;
  }
}

async function removeMovie(id) {
  try {
    const { data: deleted } = await httpService.delete(getUrl(id));
    const { title } = deleted.data.attributes;
    toast.success(`${title} successfully deleted`);
  } catch (err) {
    toast.error(`Movie has already been deleted`);
    throw err;
  }
}

async function onMovieLike(movie) {
  try {
    const data = {
      data: {
        liked: movie.liked,
      },
    };
    await httpService.put(getUrl(movie._id), data);
    console.log(data);
  } catch (err) {
    throw err;
  }
}

export async function getGenres() {
  const { apiUrl } = config;
  const { data: movies } = await httpService.get(apiEndpoint);

  const genres = movies.data.map((movie) => movie.attributes.genre);
  const removedDuplicates = [...new Set(genres)];

  return removedDuplicates;
}

export async function getMovies() {
  let movies = [];

  try {
    const { data: moviesData } = await httpService.get(apiEndpoint);
    const allMovies = moviesData.data.map((movie) => movie.attributes);
    const movieIds = moviesData.data.map((movie) => movie.id);

    for (let i = 0; i < allMovies.length; i++) {
      movies[i] = {
        _id: movieIds[i],
        title: allMovies[i].title,
        genre: { name: allMovies[i].genre, _id: "555" },
        numberInStock: allMovies[i].numberInStock,
        dailyRentalRate: allMovies[i].dailyRentalRate,
        liked: allMovies[i].liked,
      };
    }
  } catch (err) {
    throw err;
  }
  return movies;
}

export async function getMovie(id) {
  try {
    const { data: movie } = await httpService.get(getUrl(id));
    const details = movie.data.attributes;
    return details;
  } catch (err) {
    throw err;
  }
}

export function saveMovie(movie, id) {
  if (id === undefined) {
    addMovie(movie);
  } else {
    updateMovie(movie, id);
  }
}

export function likeMovie(id) {
  onMovieLike(id);
}

export function deleteMovie(id) {
  removeMovie(id);
}
