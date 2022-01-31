import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { getMovies, likeMovie, setLikeByUser } from "../services/movieService";
import React from "react";
import { Link } from "react-router-dom";
import DarkMode from "../components/common/darkMode";
import Like from "../components/common/like";
import { Col, Row, Card, Container } from "react-bootstrap";
import TableBody from "../components/common/tableBody";
import { toast } from "react-toastify";

const AboutMe = ({ user }) => {
  const [createdMovies, setCreatedMovies] = useState();
  const [likedMovies, setLikedMovies] = useState();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const movies = await getMovies();
      const currentUser = await getCurrentUser();

      const likedMovies = movies.filter((movie) =>
        movie.likes.find((like) => like === currentUser.id)
      );

      const createdMovies = movies.filter(
        (movie) => movie.createdBy.id == currentUser.id
      );

      setCreatedMovies(createdMovies);
      setLikedMovies(likedMovies);
    } catch (err) {
      throw err;
    }
  };

  if (!createdMovies || !likedMovies || !user) return null;

  const columnsLikes = [
    { path: "_id" },
    {
      path: "title",
    },
    { path: "genre.name" },

    {
      key: "like",
      content: (movie) => (
        <Like
          likes={movie.likes}
          liked={movie.liked}
          onClick={async () => {
            const allMovies = setLikeByUser(user, movie, likedMovies);
            setLikedMovies(() => {
              return allMovies;
            });

            try {
              await likeMovie(movie);
            } catch (err) {
              toast.error("Movie has already been deleted");
              throw err;
            }
          }}
        />
      ),
    },
  ];

  const columnsMyMovies = [
    {
      path: "_id",
    },
    {
      path: "title",
      content: (movie) => {
        return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
      },
    },
    { path: "genre.name" },
  ];

  const { id, username, email, createdAt, updatedAt } = user;

  return (
    <Container className="my-3 mb-5">
      <Row>
        <h1>About Me</h1>
        <Card>
          <Card.Body>
            <p>id: {id}</p>
            <p>username: {username}</p>
            <p>email: {email}</p>
            <p>created at: {createdAt}</p>
            <p>updated at: {updatedAt}</p>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mt-5">
        <Col>
          <h1>My Movies</h1>
          <Card>
            <table className="table w-75 m-2 likeTable">
              <TableBody columns={columnsMyMovies} data={createdMovies} />
            </table>
          </Card>
        </Col>
        <Col>
          <h1>My Likes</h1>
          <Card>
            <table className="table w-75 m-2 likeTable">
              <TableBody columns={columnsLikes} data={likedMovies} />
            </table>
          </Card>
        </Col>
      </Row>
      <h1 className="mt-5">Settings</h1>
      <DarkMode />
    </Container>
  );
};
export default AboutMe;
