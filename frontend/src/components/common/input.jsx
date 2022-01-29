import { Form } from "react-bootstrap";

const Input = ({ label, name, value, error, ...rest }) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      {rest.type === "area" ? (
        <Form.Control
          {...rest}
          name={name}
          as="textarea"
          rows={3}
          value={value == label ? "" : value}
          placeholder={label}
        />
      ) : (
        <Form.Control
          {...rest}
          name={name}
          value={value == label ? "" : value}
          placeholder={label}
        />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
};
export default Input;
