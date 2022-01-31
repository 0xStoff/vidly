import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Movies from "./movies";
import Rentals from "./rentals";
import Customers from "./customers";
import NotFound from "./notfound";
import Logout from "../components/logout";
import MovieDetails from "./movieDetails";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import MovieForm from "../components/movieForm";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../services/authService";
import AboutMe from "./aboutme";

/* Navigation-Links with different paths */
const Layout = () => {
  const [user, setUser] = useState(true);
  const classes = "text-reset nav-link mb-3";

  // pass current user as props instead of calling function in every component as well as protetcted routes
  useEffect(() => {
    const user = getCurrentUser();
    // console.log(user);
    setUser(() => user);
  }, []);

  const getMediaPreference = () => {
    const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (hasDarkPreference) {
      return "dark-theme";
    } else {
      return "light-theme";
    }
  };

  const [userTheme, setUserTheme] = useState();

  useEffect(async () => {
    let initState;

    const user = await getCurrentUser();
    const toggled = localStorage.getItem("toggled");

    if (user && !toggled) initState = user.theme + "-theme";
    else {
      initState = toggled
        ? localStorage.getItem("user-theme")
        : getMediaPreference();
    }
    if (!user) initState = getMediaPreference();
    // let initUserTheme = user.theme + "-theme";
    // if (!user.theme) {
    //   initUserTheme = getMediaPreference();
    // }
    setTheme(initState);
  }, []);

  const setTheme = (theme) => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.className = theme;
    setUserTheme(theme);
  };
  return (
    <React.Fragment>
      <Navbar user={user} />
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route
            path="/movies/:id"
            element={
              <React.Fragment>
                {!user && <Navigate to="/login" />}
                <MovieDetails />
              </React.Fragment>
            }
          />
          <Route
            path="/movies/new"
            element={
              <React.Fragment>
                <h1 className="m-5">Movies Form</h1>
                {!user && <Navigate to="/login" />}
                <MovieForm />
              </React.Fragment>
            }
          />
          <Route path="/login" element={<LoginForm user={user} />} />
          <Route path="/me" element={<AboutMe user={user} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/movies" element={<Movies user={user} />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/movies" />} />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default Layout;
