import { Modal, useModal } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Grid , Card, Text, Row, Spacer,Link, Container, Input } from '@nextui-org/react';
import Layout from './Layout';
import { useSelector, useDispatch } from "react-redux";
import { fetchFun } from "../js/fetchFun"


export default function FileModal(prop) {

  const { setVisible, bindings } = useModal();

  const [modalFile,setModalFile] = useState()
  const [image,setImage] = useState()
  const token = useSelector((state) => state.token.value);
  const uid = useSelector((state) => state.uid.value);
  const role = useSelector((state) => state.role.value);
  const [deleteButton, setDeleteButton] = useState()


useEffect(()=>{

    if(role == 1){
      setDeleteButton(<img src="https://cdn-icons-png.flaticon.com/512/1828/1828851.png" width="50px" height="50px" alt="delete" />)
    }
    
    switch (prop.file_name.split('.').pop()) {
      case 'JPG':
      case 'jpg':
      case 'PNG':
      case 'png': 
      case 'GIF':
      case 'gif':
        setImage("https://cdn-icons-png.flaticon.com/512/1829/1829586.png")
        break;
      case 'PDF':
      case 'pdf':
        setImage("https://cdn-icons-png.flaticon.com/512/337/337946.png")
        break;
      default: setImage("https://cdn-icons-png.flaticon.com/512/4725/4725544.png")
        break;
    }


},[])



const fileHandler = async (idFile,fileName,filePath) => {
    setVisible(true)
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_NODE_SERVER}/getdocument/${idFile}?filePath=${filePath}`, {
        method: "GET",
        headers:{
            authorization: token,
        }
    })
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    console.log(blob.type)
    switch(blob.type){
      case "image/png":
      case "image/PNG":
      case "image/jpg":
      case "image/JPG":
      case "image/jpeg":
      case "image/JPEG":
      case 'image/gif':
        return <img src={objectUrl} alt="" /> 
        break;
      case 'application/pdf': 
        return <iframe src={objectUrl} height={"100%"} width={"100%"}></iframe>
        default: 
          return<Text>File format not supported</Text>
        break;
        
    }

    return <img src={objectUrl} alt="" /> 
    } catch (error){
        error
    }

   

}






  return (
    <div>

<Container  key={prop.idFile} gap={2} style={{flexDirection: 'column'}}>
  <Container justify="center" style={{  marginBottom: '10px',flexDirection: 'row', display: 'flex' }}>
            <Container  onClick={async () =>  setModalFile(await fileHandler(prop.idFile,prop.file_name,prop.file_path)) } style={{backgroundColor: '#1F2122', width:"90%" , borderRadius: "15px", marginBottom: '10px',flexDirection: 'row', display: 'flex' }} >             
                  <img src={image} style={{width: "50px", marginRight: "10%", margin: "2%"}} />
                  <div style={{flexDirection: 'column', display:'flex', justifyContent:'center'}}>
                    <p style={{color: "white"}}>ID: {prop.idFile}</p>
                    <p style={{color: "white",textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '50vw'}}>Name:  {prop.file_name}</p>
                  </div>
            </Container>
            
            {deleteButton}
            </Container>
            
      </Container>


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
