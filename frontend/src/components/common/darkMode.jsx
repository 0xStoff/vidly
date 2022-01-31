import React, { useState, useEffect } from "react";
import "./darkMode.css";
import "font-awesome/css/font-awesome.css";
import httpService from "../../services/httpService";
import { getCurrentUser } from "../../services/authService";
import { toast } from "react-toastify";

const DarkMode = () => {
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
  // const user = await getCurrentUser();
  // let initUserTheme = user.theme + "-theme";
  // if (!user.theme) {
  //   initUserTheme = getMediaPreference();
  // }
  // setTheme(initUserTheme);
  useEffect(async () => {
    // const initState = localStorage.getItem("toggled")
    //   ? localStorage.getItem("user-theme")
    //   : getMediaPreference();
    // // const user = await getCurrentUser();
    // // let initUserTheme = user.theme + "-theme";
    // // if (!user.theme) {
    // //   initUserTheme = getMediaPreference();
    // // }
    // setTheme(initState);
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

  const toggleTheme = async () => {
    localStorage.setItem("toggled", true);
    const user = await getCurrentUser();
    let data;
    const activeTheme = localStorage.getItem("user-theme");
    if (activeTheme === "light-theme") {
      data = {
        theme: "dark",
      };
      setTheme("dark-theme");
    } else {
      data = {
        theme: "light",
      };
      setTheme("light-theme");
    }
    await httpService.put(`http://localhost:1337/api/users/${user.id}`, data);
  };

  const setTheme = (theme) => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.className = theme;
    setUserTheme(theme);
  };

  const toggleClass =
    userTheme === "dark-theme"
      ? "switch-toggle"
      : "switch-toggle switch-toggle-checked";

  // console.log(userTheme);

  return (
    <React.Fragment>
      <input
        onChange={toggleTheme}
        id="checkbox"
        type="checkbox"
        className="switch-checkbox"
      />

      <label htmlFor="checkbox" className="switch-label">
        <span>
          <i className="fa fa-moon-o moon" />
        </span>
        <span>
          <i className="fa fa-sun-o sun" />
        </span>
        <div className={toggleClass}></div>
      </label>
    </React.Fragment>
  );
};

export default DarkMode;
