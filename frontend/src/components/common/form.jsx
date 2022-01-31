import React, { useImperativeHandle } from "react";
import Joi, { validate } from "joi-browser";
import { Form } from "react-bootstrap";
import Input from "./input";
import Select from "./select";

const FormComponent = (props) => {
  const { schema, doSubmit, button, inputs, selects, textareas } = props;
  const { data, setData, errors, setErrors } = props.states;

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
    doSubmit(e);
  };

  const handleChange = ({ target: input }) => {
    // window.onbeforeunload = () => 1;
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

  const renderButton = (label) => {
    return (
      <button disabled={validate()} className="btn button" type="submit">
        {label}
      </button>
    );
  };

  const renderInput = (name, label, value, type = "text") => {
    return (
      <Input
        name={name}
        label={label}
        value={value}
        type={type}
        key={name}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderSelectInput = (name, label, value, options) => {
    return (
      <Select
        name={name}
        label={label}
        value={value}
        key={name}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      {inputs.map((input) => {
        if (input.options) {
          return renderSelectInput(
            input.name,
            input.label,
            input.value,
            input.options
          );
        }
        return renderInput(input.name, input.label, input.value, input.type);
      })}
      {renderButton(button)}
    </Form>
  );
};

export default FormComponent;
