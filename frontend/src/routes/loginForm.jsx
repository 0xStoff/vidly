import React, { useState } from "react";
import FormComponent from "../components/common/form";
import { login } from "../services/authService";
import { schemaLogin } from "../config.schema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ user }) => {
  const [data, setData] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const states = { data, setData, errors, setErrors };
  const navigate = useNavigate();
  const doSubmit = async () => {
    try {
      // toast.success("Successfully Logged in");
      await login(data);
      window.location = "/";
    } catch (err) {
      toast.error("Login credentials are wrong!");
      throw err;
    }
  };

  if (user) navigate("/");

  return (
    <div className="container w-50 mt-5">
      <FormComponent
        doSubmit={doSubmit}
        schema={schemaLogin}
        states={states}
        button={"Login"}
        inputs={[
          { name: "identifier", label: "Username" },
          { name: "password", label: "Password", type: "password" },
        ]}
      />
    </div>
  );
};

export default LoginForm;
