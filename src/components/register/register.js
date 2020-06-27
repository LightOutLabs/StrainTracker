import React, { useState } from "react";
import { Form, Icon, Input, Button, Card } from "antd";
import { Container } from "../../styles/styled";
import axios from "axios";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCon, setPasswordCon] = useState("");

  const handleSubmit = (e) => {
    //handle the submit of the form
    e.preventDefault();
    console.log(process.env.REACT_APP_BACKEND_ENVIRONMENT);
    const values = { username, password };
    axios
      .post(`${process.env.REACT_APP_BACKEND_ENV}/auth/register`, values)
      .then((res) => {
        alert(`account registered correctly, please log in.`);
        props.history.push("/login");
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
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoComplete="off"
          />
          <Input
            placeholder="Password"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="off"
          />
          <Input
            placeholder="Password Confirm"
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setPasswordCon(e.target.value);
            }}
            autoComplete="off"
          />
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", marginBottom: "10px" }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Register
          </Button>
          Or
          <Button
            type="primary"
            onClick={() => {
              props.history.push("/login");
            }}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
