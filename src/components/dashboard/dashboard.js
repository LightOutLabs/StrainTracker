import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { Container, DashContainer, starSize } from "../../styles/styled";
import { getStrains, database } from "../../firebase/index";
import StarRating from "react-star-ratings";

const Dashboard = (props) => {
  const { Title } = Typography;
  const [strains, setStrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numOfStrains, setNumOfStrains] = useState(0);
  const addStrain = () => {
    props.history.push("/addStrain");
  };

  useEffect(() => {
    const data = getStrains(2);
    console.log(data);
    let strainArray = [];
    const pullStrains = database
      .collection(`/users/${localStorage.getItem("userID")}/strains`)
      .onSnapshot((snap) => {
        snap.docs.forEach((doc) => {
          strainArray.push({ ...doc.data() });
        });
        setStrains(strainArray);
        setNumOfStrains(strainArray.length);
        setLoading(false);
      });
  }, []);
  const setDate = (seconds) => {
    let t = new Date();
    t.setSeconds(seconds);
    return t.toString();
  };

  return loading ? (
    <Title>Loading</Title>
  ) : (
    <DashContainer>
      <Row>
        <Col span={24}>
          <Title>Welcome back to StrainLog, MegaTrapper6969</Title>
        </Col>
      </Row>
      <Row>
        <Card
          title="Add a new strain to your log"
          style={{ width: 400, textAlign: "center" }}
        >
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "25px", marginBottom: "25px" }}
            onClick={addStrain}
          >
            +
          </Button>
        </Card>
      </Row>
      <Row style={{ marginTop: "30px" }}>
        <Title level={2}>Your recent strains</Title>
      </Row>
      <Row>
        {/* First recent card */}
        <Card
          title={strains[0].strainName.strain}
          style={{ width: 300 }}
          cover={
            <img
              alt="INSERT_STRAIN_NAME"
              src={strains[0].photoUrl}
              height="300px"
            />
          }
        >
          <p>
            Nose:
            <StarRating
              numberOfStars={strains[0].noseRating.noseRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Looks:
            <StarRating
              numberOfStars={strains[0].looksRating.looksRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Munchies:
            <StarRating
              numberOfStars={strains[0].munchieRating.munchieRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Body Feel:
            <StarRating
              numberOfStars={strains[0].bodyRaing.bodyRaing}
              starDimension={starSize}
            />
          </p>
          <p>
            Head Feel:
            <StarRating
              numberOfStars={strains[0].headRating.headRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Overall Rating:
            <StarRating
              numberOfStars={strains[0].overallAvg}
              starDimension={starSize}
            />
          </p>
        </Card>
        <Card
          title={strains[1].strainName.strain}
          style={{ width: 300, marginLeft: "3px" }}
          cover={
            <img
              alt="INSERT_STRAIN_NAME"
              src={strains[1].photoUrl}
              height="300px"
            />
          }
        >
          <p>
            Nose:
            <StarRating
              numberOfStars={strains[1].noseRating.noseRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Looks:
            <StarRating
              numberOfStars={strains[1].looksRating.looksRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Munchies:
            <StarRating
              numberOfStars={strains[1].munchieRating.munchieRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Body Feel:
            <StarRating
              numberOfStars={strains[1].bodyRaing.bodyRaing}
              starDimension={starSize}
            />
          </p>
          <p>
            Head Feel:
            <StarRating
              numberOfStars={strains[1].headRating.headRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Overall Rating:
            <StarRating
              numberOfStars={strains[1].overallAvg}
              starDimension={starSize}
            />
          </p>
        </Card>
        <Card
          title={strains[2].strainName.strain}
          style={{ width: 300, marginLeft: "3px" }}
          cover={
            <img
              alt="INSERT_STRAIN_NAME"
              src={strains[2].photoUrl}
              height="300px"
            />
          }
        >
          <p>
            Nose:
            <StarRating
              numberOfStars={strains[2].noseRating.noseRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Looks:
            <StarRating
              numberOfStars={strains[2].looksRating.looksRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Munchies:
            <StarRating
              numberOfStars={strains[2].munchieRating.munchieRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Body Feel:
            <StarRating
              numberOfStars={strains[2].bodyRaing.bodyRaing}
              starDimension={starSize}
            />
          </p>
          <p>
            Head Feel:
            <StarRating
              numberOfStars={strains[2].headRating.headRating}
              starDimension={starSize}
            />
          </p>
          <p>
            Overall Rating:
            <StarRating
              numberOfStars={strains[2].overallAvg}
              starDimension={starSize}
            />
          </p>
        </Card>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        {/*TODO hook up view all onClick */}
        {console.log(strains)}
        <Button
          type="secondary"
          onClick={() => {
            props.history.push("/viewStrain");
          }}
        >
          View all
        </Button>
      </Row>
    </DashContainer>
  );
};

export default Dashboard;
