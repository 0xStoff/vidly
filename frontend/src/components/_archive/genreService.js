// import httpService from "./httpService";
// import config from "../config.json";

// export async function getGenres() {
//   const { apiUrl } = config;
//   const { data: movies } = await httpService.get(`${apiUrl}/movies`);

//   const genres = movies.data.map((movie) => movie.attributes.genre);
//   const removedDuplicates = [...new Set(genres)];

//   return removedDuplicates;
// }
