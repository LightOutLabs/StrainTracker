import React, { useState } from "react";
import { DashContainer, fontSizeP, starSize } from "../../../styles/styled";
import {
  Form,
  Card,
  Icon,
  Button,
  Input,
  Row,
  Col,
  Typography,
  Carousel,
  Progress,
} from "antd";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { storage, createStrainList } from "../../../firebase/index";

const AddStrain = (props) => {
  const { Title, Text } = Typography;

  const [strain, setStrain] = useState("");
  const [nose, setNose] = useState(0);
  const [looks, setLooks] = useState(0);
  const [body, setBody] = useState(0);
  const [head, setHead] = useState(0);
  const [munchie, setMunchie] = useState(0);
  const [photos, setPhotos] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const onPhotoChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const getAverage = (nose, looks, body, head, munchie) => {
    let total = nose + looks + body + head + munchie;
    let avg = total / 5;
    return Math.round(avg);
  };

  const addStrain = (e) => {
    e.preventDefault();
    const uploadTask = storage
      .ref(`images/${localStorage.getItem("userID")}/${strain}/${file.name}`)
      .put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        let overallAvg = getAverage(nose, looks, body, head, munchie);
        storage
          .ref("images")
          .child(localStorage.getItem("userID"))
          .child(strain)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            createStrainList(
              localStorage.getItem("userID"),
              strain,
              nose,
              looks,
              body,
              head,
              munchie,
              url,
              overallAvg
            );
            props.history.push("/dashboard");
          });
      }
    );

    setTimeout(() => {
      setProgress(0);
    }, 5000);
  };

  console.log(nose, looks, body, head, munchie);

  return (
    <DashContainer>
      <Form onSubmit={addStrain}>
        <Row>
          <Card
            title="Add Strain to Log"
            style={{ width: "600px", marginTop: "15px", textAlign: "center" }}
          >
            <Input
              placeholder="Strain Name"
              style={{ marginBottom: "10px" }}
              onChange={(e) => {
                setStrain(e.target.value);
              }}
              required={true}
            />
            <Text style={{ fontSize: fontSizeP, marginRight: "10px" }}>
              How was the nose?
            </Text>
            <StarRatings
              rating={nose}
              starRatedColor="grey"
              changeRating={setNose}
              numberOfStars={5}
              starDimension={starSize}
            />
            <br />
            <Text style={{ fontSize: fontSizeP, marginRight: "10px" }}>
              How was the looks?
            </Text>
            <StarRatings
              rating={looks}
              starRatedColor="grey"
              changeRating={setLooks}
              numberOfStars={5}
              starDimension={starSize}
            />
            <br />
            <Text style={{ fontSize: fontSizeP, marginRight: "10px" }}>
              How was the body high?
            </Text>
            <StarRatings
              rating={body}
              starRatedColor="grey"
              changeRating={setBody}
              numberOfStars={5}
              starDimension={starSize}
            />
            <br />
            <Text style={{ fontSize: fontSizeP, marginRight: "10px" }}>
              How was the head high?
            </Text>
            <StarRatings
              rating={head}
              starRatedColor="grey"
              changeRating={setHead}
              numberOfStars={5}
              starDimension={starSize}
            />
            <br />
            <Text style={{ fontSize: fontSizeP, marginRight: "10px" }}>
              How were the munchies?
            </Text>
            <StarRatings
              rating={munchie}
              starRatedColor="grey"
              changeRating={setMunchie}
              numberOfStars={5}
              starDimension={starSize}
            />
            <br />
            <Text style={{ fontSize: fontSizeP, marginRight: "10px" }}>
              Upload a picture
            </Text>
            <Input type="file" id="customFile" onChange={onPhotoChange} />
            <Button type="secondary" onClick={addStrain}>
              {fileName}
            </Button>
            <Progress percent={progress} />
            <Carousel autoplay>
              <img src={url} />
            </Carousel>
            <br />
          </Card>
        </Row>
      </Form>
    </DashContainer>
  );
};

export default AddStrain;
