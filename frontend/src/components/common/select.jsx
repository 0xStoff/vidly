import { Form, ThemeProvider } from "react-bootstrap";
import { useState, useEffect } from "react";

const Select = ({ label, name, value, error, options, ...rest }) => {
  // let defaultValue;
  // if (value == "genre") defaultValue = "Select Genre";
  // else defaultValue = value;
  // console.log(value);
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(() => value);
  }, [value]);
  // console.log(input);

  return (
    <Form.Group className="mb-3" controlId={"name"}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        name={name}
        value={input}
        onChange={(e) => {
          setInput(() => e.target.value);
        }}
      >
        <option>Select Genre</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        {error && <div className="alert alert-danger">{error}</div>}
      </Form.Select>
    </Form.Group>
  );
};
export default Select;
