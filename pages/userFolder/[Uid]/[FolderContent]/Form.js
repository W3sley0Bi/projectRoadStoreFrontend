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
import JSZip from 'jszip';

export default function Form() {
  const router = useRouter();
  const { theme } = useTheme();
  const { Uid, FolderContent } = router.query;
  const [pdfData, setPdfData] = useState();
  const [textArea, setTextArea] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [fileList, setFileList] = useState(null);
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

    if (files.length > 0) return true;
    alert("you need to fill the Installateur section with min. 3 images!");
    return false;
  };

  const sendForm = async () => {
    const info = await checker(files.length);
  
    if (info === false) return;
  
    const formData = new FormData(); // create a new FormData instance
  
    let zip = new JSZip(); // create a new JSZip instance
  
    // add selected files to the zip
    for (let i = 0; i < files.length; i++) {
      zip.file(files[i].name, files[i]);
    }
  
    // generate the zip file and append it to the formData
   let blob = await zip.generateAsync({ type: "blob" }) 

    formData.append("fileZip", blob, "imgs.zip");
    const pdfDataString = JSON.stringify(pdfData);
    formData.append("pdfData", pdfDataString);
    formData.append("Uid", Uid);
    formData.append("FolderContent", FolderContent);
    formData.append("textArea", textArea);
  
    setIsDisabled(true);
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
          router.push(`/`);
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
