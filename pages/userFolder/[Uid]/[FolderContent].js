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
    const [addFile,setAddFile] = useState()
    const token = useSelector((state) => state.token.value);
    const uid = useSelector((state) => state.uid.value);
    const role = useSelector((state) => state.role.value);

    useEffect(()=>{
        if(!router.isReady) return;
    (async () => {
      
         if(role*1 === 2){
        let form = <RedirectHandler key={1} route={`/${Uid}/${FolderContent}/Form`}> I've Finished </RedirectHandler>
        setFormButton(form)
      }else if(role*1 === 1){
        let addFilePage = <RedirectHandler key={2} route={`/${Uid}/${FolderContent}/AddFiles`}> + AddFiles </RedirectHandler>
        setAddFile(addFilePage)
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

            } else{
                router.push(`/userFolder/${uid}`);
    
            }
    })()
    }, [router.isReady]);


    return( 
        <>
        <Layout>
            {formButton}
            {addFile}
        <Container gap={2} style={{ flexDirection: "column" }}>
          <br />
          {file}
        </Container>
        </Layout>
        </>
    )
}