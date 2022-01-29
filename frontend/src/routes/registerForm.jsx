import React, { useState, useEffect, useRef } from "react";
import FormComponent from "../components/common/form";
import { schemaUser } from "../config.schema";
import { register } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { login } from "../services/authService";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const states = { data, setData, errors, setErrors };
  const navigate = useNavigate();

  const doSubmit = async () => {
    try {
      await toast.promise(register(data), {
        pending: "pending register user",
        success: `${data.username} successfully registered, you will logged in shortly`,
        error: "Email is already taken",
      });

      setTimeout(async () => {
        const user = {
          identifier: data.email,
          password: data.password,
        };

        await login(user);
        window.location = "/";
      }, 4000);
    } catch (err) {
      setData(() => ({ email: "" }));
      throw err;
    }
  };

  return (
    <div className="container w-50 mt-5">
      <FormComponent
        doSubmit={doSubmit}
        schema={schemaUser}
        states={states}
        button={"Register"}
        inputs={[
          { name: "email", label: "Email", value: data.email },
          {
            name: "password",
            label: "Password",
            value: data.password,
            type: "password",
          },
          { name: "username", label: "Username", value: data.username },
        ]}
      />
    </div>
  );
};

export default RegisterForm;
