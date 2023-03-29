import { Modal, useModal } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import {
  Button,
  Grid,
  Card,
  Text,
  Row,
  Spacer,
  Link,
  Container,
  Input,
} from "@nextui-org/react";
import Layout from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { fetchFun } from "../js/fetchFun";
import Loader from "./Loader"
import NoData from "./NoData";

export default function FileModal(prop) {
  const { setVisible, bindings } = useModal();

  const [modalFile, setModalFile] = useState();
  const [image, setImage] = useState();
  const token = useSelector((state) => state.token.value);
  const uid = useSelector((state) => state.uid.value);
  const role = useSelector((state) => state.role.value);
  const [deleteButton, setDeleteButton] = useState();
  const [loader, setLoader] = useState(<Loader></Loader>)

  useMemo(() => {
    if (role == 1) {
      setDeleteButton(
        <>        <Spacer y={.5}/>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828851.png"
          width="50px"
          height="50px"
          alt="delete"
        />
        </>

      );
    }

   (async () => { 
    {setLoader(null)}
     switch (prop.file_type) {
      case "image/jpeg":
      case "image/jpg":
      case "image/png":
      case "image/gif":
      case "image/tiff":
      case "image/webp":
      case "image/svg+xml":
      case "image/bmp":
      case "image/x-icon":
      case "image/heif":
      case "image/heic":
        await setImage("https://cdn-icons-png.flaticon.com/512/1829/1829586.png");
        break;
      case "application/pdf":
        await setImage("https://cdn-icons-png.flaticon.com/512/337/337946.png");
        break;
      default:
        await setImage("https://cdn-icons-png.flaticon.com/512/4725/4725544.png");
        break;
    }

  })()
  },[]);

  const fileHandler = async (idFile, fileName, fileData, fileType) => {
    setVisible(true);
    try {
      const blob = new Blob([new Uint8Array(fileData.data)], {
        type: fileType,
      });
      const url = URL.createObjectURL(blob);

      console.log(fileType);
      switch (fileType) {
        case "application/pdf":
          return <iframe src={url} height={"100%"} width={"100%"}></iframe>;
          break;
        case "image/jpeg":
        case "image/jpg":
        case "image/png":
        case "image/gif":
        case "image/tiff":
        case "image/webp":
        case "image/svg+xml":
        case "image/bmp":
        case "image/x-icon":
        case "image/heif":
        case "image/heic":
          return <img src={url} />;
          break;
        default:
          return <h1>file format not supported yet</h1>;
          break;
      }
    } catch (error) {
      error;
    }
  };

  return (
    <div>
      {loader}
      { prop.file_name?
    
        <Container
          key={prop.idFile}
          gap={2}
          style={{ flexDirection: "column" }}
        >
          <Row
          
          >
            <Container
              onClick={async () =>
                setModalFile(
                  await fileHandler(
                    prop.idFile,
                    prop.file_name,
                    prop.file_data,
                    prop.file_type
                  )
                )
              }
              
              style={{
                backgroundColor: "#1F2122",
                borderRadius: "15px",
                marginBottom: "10px",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <img
                src={image}
                style={{ width: "50px", marginRight: "10%", margin: "2%" }}
              />
              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p style={{ color: "white" }}>ID: {prop.idFile}</p>
                <p
                  style={{
                    color: "white",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "40vw",
                  }}
                >
                  Name: {prop.file_name}
                </p>
              </div>
            </Container>
           
                {deleteButton}
          </Row>
        </Container>
      
      : <NoData></NoData>
}



      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {prop.file_name}
          </Text>
        </Modal.Header>
        <Modal.Body>
          {/*  id="modal-description"*/}

          {modalFile}
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
          {/* <Button onPress={() => setVisible(false)}>Agree</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
