import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
import RedirectHandler from "../../components/RedirectHandler";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Grid,
  Card,
  Text,
  Row,
  Spacer,
  Link,
  Container,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../stores/store";
import Layout from "../../components/Layout";
import { fetchFun } from "../../js/fetchFun"

export default function UserFolders() {
  const router = useRouter();
  const { Uid } = router.query;
  const [folder, setFolder] = useState("");
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState("");
  const token = useSelector((state) => state.token.value);
  const uid = useSelector((state) => state.uid.value);
  const role = useSelector((state) => state.role.value);

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      //user role
      if (Uid == uid || role == 1) {
        const res = await fetchFun(`/userFolder/${Uid}`, "GET", {}, token);
        if (res === 401) {
          router.push("/Login");
        } else {
          const folders = res.result.map((item) => (
            <Container
              key={item.idFolder}
              style={{
                backgroundColor: "#1F2122",
                borderRadius: "15px",
                marginBottom: "10px",
              }}
            >
              <Link href={`/userFolder/${Uid}/${item.idFolder}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/716/716784.png "
                  style={{ width: "15%", marginRight: "10%" }}
                />
                <div style={{ flexDirection: "column" }}>
                  <p style={{ color: "white" }}>ID: {item.idFolder}</p>
                  <p style={{ color: "white" }}>Name: {item.name}</p>
                </div>
              </Link>
            </Container>
          ));

          setFolders(folders);
        }
      } else {
        router.push(`/userFolder/${uid}`);
      }
    })();
  }, [router.isReady,router]);

  return (
    <>
      <Layout>
        {/* {coditional rendering here for the button if the he has the role. then chek also the} */}
        <RedirectHandler route={`${Uid}/AddFiles`}> + AddFolder </RedirectHandler>
        
        <Container gap={2} style={{ flexDirection: "column" }}>
          <br />
          {folders}
        </Container>
      </Layout>
    </>
  );
}
