import { Modal, useModal, Button, Text } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FileModal(prop) {

  const { setVisible, bindings } = useModal();
  const [token,setToken] = useState("")

// useEffect(()=>{
//     const tokenGot = localStorage.getItem('token')
//     setToken(tokenGot)
// })

function fileHandler(idFile,fileName,filePath){
    setVisible(true)
    // axios.get(`${process.env.NEXT_PUBLIC_NODE_SERVER}/getdocument/${idFile}?filePath=${filePath}`, {
    //     headers:{
    //         Authorization: token,
    //     }
    // })
    // .then(res=> {

    //     console.log(res)     
    // })
    // .catch(err => alert(err))
    
    //router.push(`/userFolder/${Uid}/${FolderContent}/${fileName}`)

 }

//console.log(process.env.NEXT_PUBLIC_NODE_SERVER + '' + prop.file_path)

  return (
    <div>


      <div key={prop.idFile}  onClick={() => fileHandler(prop.idFile,prop.file_name,prop.file_path)}> 

                <p>file ID: {prop.idFile}</p>
                <p>filename: {prop.file_name}</p>
                <p>file_path: {prop.file_path}</p>
            <br/>
    </div>

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
          <Text>{__dirname + "tmpFiles/"}</Text>
          
     <img src={`${process.env.NEXT_PUBLIC_NODE_SERVER}/getdocument/${prop.idFile}?filePath=${prop.file_path}`} alt="" /> 
       
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
