import React from "react";
import { useParams } from "react-router-dom";
import MovieForm from "../components/movieForm";

const MovieDetails = () => {
  const { id } = useParams();

  return (
    <React.Fragment>
      <h1 className="m-5">Movie Details - {id}</h1>
      <MovieForm />
    </React.Fragment>
  );
};
export default MovieDetails;
