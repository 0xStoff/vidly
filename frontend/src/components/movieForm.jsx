import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useRoutes } from "react-router-dom";
import FormComponent from "./common/form";
import { Container } from "react-bootstrap";
import { saveMovie, getMovie, getGenres } from "../services/movieService";
import { schemaMovie } from "../config.schema";
import { getCurrentUser } from "../services/authService";

const AddMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "Title",
    genre: "Genre",
    numberInStock: "Number in Stock",
    dailyRentalRate: "DailyRentalRate",
  });

  const [genres, setGenres] = useState([]);

  const user = getCurrentUser();

  useEffect(() => {
    getMovieById();
  }, []);

  const getMovieById = async () => {
    try {
      if (id) {
        const movie = await getMovie(id);
        if (user.id != movie.user.data.id) navigate("/not-found");
        delete movie.user;
        delete movie.likes;
        setData(() => movie);
      }
    } catch (err) {
      return navigate("/not-found", "/movies");
    }

    const genres = await getGenres();
    setGenres(() => genres);
  };

  const [errors, setErrors] = useState({});
  const states = { data, setData, errors, setErrors };

  const doSubmit = (e) => {
    const inputs = e.target;
    const movie = {
      data: {
        title: inputs["title"].value,
        description: inputs["description"].value,
        genre: inputs["genre"].value,
        numberInStock: inputs["numberInStock"].value,
        dailyRentalRate: inputs["dailyRentalRate"].value,
        liked: false,
        user: {
          id: user.id,
        },
      },
    };
    saveMovie(movie, id);
    navigate("/movies");
  };

  const { title, genre, dailyRentalRate, numberInStock, description } = data;

  let rentalRate = "";
  if (!isNaN(dailyRentalRate)) {
    rentalRate = dailyRentalRate;
  }
  return (
    <Container className="w-75 mb-5">
      <FormComponent
        doSubmit={doSubmit}
        schema={schemaMovie}
        states={states}
        button={"Save"}
        textareas={[
          { name: "description", label: "Description", value: description },
        ]}
        inputs={[
          { name: "title", label: "Title", value: title },
          {
            name: "description",
            label: "Description",
            value: description,
            type: "area",
          },

          {
            name: "genre",
            label: "Genre",
            value: genre,
            options: genres,
          },
          {
            name: "dailyRentalRate",
            label: "Daily Rental Rate",
            value: rentalRate,
            type: "number",
          },
          {
            name: "numberInStock",
            label: "Number in Stock",
            value: numberInStock,
            type: "number",
          },
        ]}
      />
    </Container>
  );
};
export default AddMovie;
