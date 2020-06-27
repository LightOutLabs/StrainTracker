import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { Container, DashContainer, starSize } from "../../../styles/styled";
import { getStrains, database } from "../../../firebase/index";
import StarRating from "react-star-ratings";

const ViewStrain = (props) => {
  const { Title } = Typography;
  const [strains, setStrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numOfStrains, setNumOfStrains] = useState(0);

  useEffect(() => {
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

  const showStrains = () => {
    strains.forEach((e) => {
      console.log(e.strainName.strain);
      return e.strainName.strain;
    });
  };

  return loading ? (
    <Title>Loading...</Title>
  ) : (
    <DashContainer>
      <Title> Your Strains</Title>
      {strains.map((item, index) => {
        return (
          <Card
            title={item.strainName.strain}
            style={{ width: "500px" }}
            cover={<img src={item.photoUrl} height="100%" />}
            key={index}
          >
            <p>
              Nose:
              <StarRating
                numberOfStars={item.noseRating.noseRating}
                starDimension={starSize}
              />
            </p>
            <p>
              Looks:
              <StarRating
                numberOfStars={item.looksRating.looksRating}
                starDimension={starSize}
              />
            </p>
            <p>
              Munchies:
              <StarRating
                numberOfStars={item.munchieRating.munchieRating}
                starDimension={starSize}
              />
            </p>
            <p>
              Body Feel:
              <StarRating
                numberOfStars={item.bodyRaing.bodyRaing}
                starDimension={starSize}
              />
            </p>
            <p>
              Head Feel:
              <StarRating
                numberOfStars={item.headRating.headRating}
                starDimension={starSize}
              />
            </p>
            <p>
              Overall Rating:
              <StarRating
                numberOfStars={item.overallAvg}
                starDimension={starSize}
              />
            </p>
          </Card>
        );
      })}
    </DashContainer>
  );
};

export default ViewStrain;
