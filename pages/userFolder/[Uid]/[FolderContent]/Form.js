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

  const [isDisabled, setIsDisabled] = useState(false);

  const token = useSelector((state) => state.token.value);
  const uid = useSelector((state) => state.uid.value);
  const role = useSelector((state) => state.role.value);


  const callback = (props) => {
    setPdfData(props);
  };

  const checker = async () => {
    if (pdfData.sign1 == null || pdfData.sign2 == null) {
      alert("missing signature");
      return false;
    }
  };

  const sendForm = async () => {
    const info = await checker();

    if (info === false) return;

    const formData = new FormData(); // create a new FormData instance

    const pdfDataString = JSON.stringify(pdfData);
    

    formData.append("pdfData", pdfDataString);
    formData.append("Uid", Uid);
    formData.append("FolderContent", FolderContent);


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
          router.push(`/`)
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
