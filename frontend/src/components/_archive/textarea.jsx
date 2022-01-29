import { Form } from "react-bootstrap";

const TextArea = ({ label, name, value, error, ...rest }) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        {...rest}
        name={name}
        value={value == label ? "" : value}
        placeholder={label}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
};
export default TextArea;
