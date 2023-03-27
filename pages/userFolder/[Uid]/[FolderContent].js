import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import FileModal from "../../../components/FileModal"
import Layout from '../../../components/Layout';
import { useSelector, useDispatch } from "react-redux";
import { fetchFun } from '../../../js/fetchFun';
import RedirectHandler from "../../../components/RedirectHandler";
import { Container, Row, Col, Spacer } from "@nextui-org/react";


export default function FolderContent(){

    const router = useRouter()
    const { Uid,FolderContent } = router.query
    const [file, setFile] = useState([])
    const [formButton,setFormButton] = useState()
    const token = useSelector((state) => state.token.value);
    const uid = useSelector((state) => state.uid.value);
    const role = useSelector((state) => state.role.value);

    useEffect(()=>{
        if(!router.isReady) return;
    (async () => {
        //user role
        if(role == 2){
          let form = <RedirectHandler route={`${Uid}/formWorkers`}> I've finished </RedirectHandler>
          setFormButton(form)
        }
  
        if (Uid == uid || role == 1) {
          const res = await fetchFun(`/userFolder/${Uid}/${FolderContent}`, "GET", {}, token);
          if (res === 401) {
            router.push("/Login");
          } else {
                const file = res.map(item => 
                    <FileModal key={item.idFile} idFile={item.idFile} file_name={item.file_name} file_path={item.file_path} ></FileModal>
                    );
                    setFile(file) 
                }

            } else {
                router.push(`/userFolder/${uid}`);
              }
    })()
    }, [router.isReady]);


    return( 
        <>
        <Layout>
            {formButton}
        <Container gap={2} style={{ flexDirection: "column" }}>
          <br />
          {file}
        </Container>
        </Layout>
        </>
    )
}