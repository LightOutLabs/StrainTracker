import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { Container } from "../../styles/styled";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    //handle the login
    const values = { username, password };
    axios
      .post(`${process.env.REACT_APP_BACKEND_ENV}/auth/login`, values)
      .then((res) => {
        localStorage.setItem("userID", res.data.userID);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container>
      <Card
        title="Welcome to StrainLog"
        style={{ width: 300, textAlign: "center" }}
      >
        <Form onSubmit={handleLogin}>
          <Input
            placeholder="Username"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="primary"
            style={{ width: "100%", marginBottom: "10px" }}
            htmlType="submit"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Login
          </Button>
          Or
          <Button
            type="primary"
            className="login-form-button"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => {
              props.history.push("/register");
            }}
          >
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
