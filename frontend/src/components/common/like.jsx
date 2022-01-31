import React from "react";
import { getCurrentUser } from "../../services/authService";

const user = getCurrentUser();

const Like = ({ onClick, likes }) => {
  let classes = "clickable heartIcon fa fa-heart";
  let increment = likes.length;
  const findById = user ? likes.find((id) => id == user.id) : null;
  if (!findById) classes += "-o";
  if (increment === 0) increment = "";

  return (
    <div className="d-flex mt-1">
      <i onClick={onClick} className={classes} aria-hidden="true" />
      <div className="like mx-1 my-2">{increment}</div>
    </div>
  );
};

export default Like;
