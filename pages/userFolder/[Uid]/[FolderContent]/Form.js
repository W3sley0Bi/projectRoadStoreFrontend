import {
  useTheme,
  NextUIProvider,
  Text,
  Textarea,
  Button,
  Spacer,
  Container,
} from "@nextui-org/react";
import Layout from "../../../../components/Layout";
import FormInstallLK from "../../../../components/FormInstallLK";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

export default function Form() {
  const router = useRouter();
  const { theme } = useTheme();
  const { Uid, FolderContent } = router.query;
  const [pdfData, setPdfData] = useState();
  const [textArea, setTextArea] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [fileList, setFileList] = useState(null);
  // const [images, setImages] = useState()
  const token = useSelector((state) => state.token.value);
  const uid = useSelector((state) => state.uid.value);
  const role = useSelector((state) => state.role.value);

  const files = fileList ? [...fileList] : [];

  const callback = (props) => {
    setPdfData(props);
  };

  const checker = async (file) => {
    if (pdfData.sign1 == null || pdfData.sign2 == null) {
      alert("missing signature");
      return false;
    }

    if (files.length >= 1) return true;
    alert("you need to fill the Installateur section with min. 3 images!");
    return false;
  };

  const sendForm = async () => {
    const info = await checker(files.length);

    if (info === false) return;

    const formData = new FormData(); // create a new FormData instance
    console.log(files);
//    looping trough multiple files
    if (files.length > 0) {
      files.forEach((file, i) => {
        if (file instanceof File) {
          formData.append(`file-${i}`, file, file.name);
        }
      });
    }

    // for (let i = 0; i < files.length; i++) {
    //   const reader = new FileReader();
    //   reader.readAsArrayBuffer(files[i]);
    //   reader.onloadend = async () => {
    //     const base64data = btoa(
    //       new Uint8Array(reader.result)
    //         .reduce((data, byte) => data + String.fromCharCode(byte), '')
    //     );
    //     await setImages((prevState) => ({
    //       ...prevState,
    //       [`file${i}`]: base64data,
    //     }));
    //   };
    // }
    // const imagesString = JSON.stringify(images);
    
    // console.log(images)

    const pdfDataString = JSON.stringify(pdfData);
    

    formData.append("pdfData", pdfDataString);
    formData.append("Uid", Uid);
    formData.append("FolderContent", FolderContent);
    formData.append("textArea", textArea);

    //setIsDisabled(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/formSign`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          alert("form sent correctly");
         // router.push(`/`)
        } else {
          alert(res.status);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Layout>
        <FormInstallLK getFromData={callback}></FormInstallLK>
        <Spacer y={5} />
        <Container
          style={{ color: theme.colors.primary.value, margin: "auto" }}
          gap={3}
        >
          <details
            open
            style={{ color: "white", borderRadius: "10px", padding: "15px" }}
          >
            {" "}
            <summary>INSTALLATEUR SECTION</summary>
            <Spacer y={1} />
            <input
              type="file"
              onChange={(e) => setFileList(e.target.files)}
              multiple
            />
            <ul>
              {files.map((file, i) => (
                <li key={i}>
                  {file.name} - {file.type}
                </li>
              ))}
            </ul>
            <Spacer y={0.5} />
            <Textarea
              width="90%"
              label="Notes"
              placeholder="Add Notes"
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            />
          </details>
          <Spacer y={5} />
          <Button onPress={sendForm} disabled={isDisabled}>
            Send
          </Button>
          <Spacer y={5} />
        </Container>
      </Layout>
    </>
  );
}
