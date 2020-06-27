import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { Container, DashContainer } from "../../styles/styled";

const Home = (props) => {
  const { Title } = Typography;

  return (
    <Container>
      <Card
        title="Welcome to StrainTracker"
        style={{ width: 300, textAlign: "center" }}
      >
        <Button
          type="primary"
          style={{ width: "100%", marginBottom: "10px" }}
          htmlType="submit"
          onClick={(e) => {
            props.history.push("/login");
          }}
        >
          Login
        </Button>
        <Button
          type="secondary"
          style={{ width: "100%", marginBottom: "10px" }}
          htmlType="submit"
          onClick={(e) => {
            props.history.push("/register");
          }}
        >
          Register
        </Button>
        <Button
          type="primary"
          style={{ width: "100%", marginBottom: "10px" }}
          htmlType="submit"
          onClick={(e) => {
            props.history.push("/dashboard");
          }}
        >
          Home
        </Button>
      </Card>
    </Container>
  );
};

export default Home;
