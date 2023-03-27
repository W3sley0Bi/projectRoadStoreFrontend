import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
import RedirectHandler from "../../components/RedirectHandler";
import Folder from "../../components/Folder";
import {Container,} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../stores/store";
import Layout from "../../components/Layout";
import { fetchFun } from "../../js/fetchFun"

export default function UserFolders() {
  const router = useRouter();
  const { Uid } = router.query;
  const [folders, setFolders] = useState("");
  const token = useSelector((state) => state.token.value);
  const uid = useSelector((state) => state.uid.value);
  const role = useSelector((state) => state.role.value);
  const [addFolder, setAddFoler] = useState()

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      //user role
      if(role == 1){
        let addFolderbutton = <RedirectHandler route={`${Uid}/AddFiles`}> + AddFolder </RedirectHandler>
        setAddFoler(addFolderbutton)
      }

      if (Uid == uid || role == 1) {
        const res = await fetchFun(`/userFolder/${Uid}`, "GET", {}, token);
        if (res === 401) {
          router.push("/Login");
        } else {

          const folders = res.result.map((item) => (
            <Folder key={item.idFolder} idFolder={item.idFolder} Uid={Uid} name={item.name}> </Folder>
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
        {addFolder}
        
        <Container gap={2} style={{ flexDirection: "column" }}>
          <br />
          {folders}
        </Container>
      </Layout>
    </>
  );
}
