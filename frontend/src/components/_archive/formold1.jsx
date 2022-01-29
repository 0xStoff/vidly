import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "./input";

// const FormComponent = (props) => {
//   const { schema, doSubmit, onChange } = props;
//   const [data, setData] = useState({});
//   const [errors, setErrors] = useState({});

/*


const validateProperty = ({ name, value }, schema) => {
  const obj = { [name]: value };
  const schemaObj = { [name]: schema[name] };
  const { error } = Joi.validate(obj, schemaObj);
  return error ? error.details[0].message : null;
};



const handleChange = ({ target: input }) => {
  console.log("chanfe");
  const errorsObj = { ...errors };
  const errorMessage = validateProperty(input);
  if (errorMessage) errorsObj[input.name] = errorMessage;
  else delete errorsObj[input.name];

  const user = data;
  user[input.name] = input.value;

  setErrors(() => {
    return errorsObj;
  });
  setData(() => {
    return user;
  });
};


*/

export const validate = (e, schema) => {
  const data = {
    [e.target[0].name]: e.target[0].value,
    [e.target[1].name]: e.target[1].value,
  };

  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);
  const errorsObj = {};

  if (!error) return null;

  error.details.map((item) => (errorsObj[item.path[0]] = item.message));
  return errorsObj;
};

export const handleSubmit = (schema, setErrors) => (e) => {
  e.preventDefault();
  const errors = validate(e, schema);

  setErrors(() => {
    return errors || {};
  });
  if (errors) return;
  // doSubmit();
};
