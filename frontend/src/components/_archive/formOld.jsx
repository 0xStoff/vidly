import React, { useState, useEffect } from "react";
import Joi from "joi-browser";

const FormComponent = (props) => {
  const { schema, doSubmit, inputRef } = props;
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    const errorsObj = {};

    if (!error) return null;

    error.details.map((item) => (errorsObj[item.path[0]] = item.message));
    return errorsObj;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaObj = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaObj);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(() => {
      return errors || {};
    });
    if (errors) return;
    doSubmit();
  };

  const handleChange = ({ target: input }) => {
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

  return errors, data;
};
export default FormComponent;
