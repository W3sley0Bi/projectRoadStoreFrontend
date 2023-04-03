import { useTheme, NextUIProvider, Text, Textarea , Button, Spacer, Container} from "@nextui-org/react";
import Layout from "../../../../components/Layout";
import FormInstallLK from "../../../../components/FormInstallLK"
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import FormData from 'form-data'
import { useDropzone } from 'react-dropzone';
import axios from 'axios'


export default function Form() {
  const router = useRouter()
    const { theme } = useTheme();
    const { Uid,FolderContent } = router.query
    const [pdfData, setPdfData] = useState()
    const [textArea, setTextArea] = useState()
    const [files, setFiles] = useState([])
    const [isDisabled, setIsDisabled] = useState(false);
    const token = useSelector((state) => state.token.value);
    const uid = useSelector((state) => state.uid.value);
    const role = useSelector((state) => state.role.value);


const callback = props => {
  setPdfData(props)
}

const {getRootProps, getInputProps, isDragActive} = useDropzone({
  onDrop: acceptedFiles => {
      setFiles(acceptedFiles)
  },
  multiple: true,
  accept: 'image/*, .pdf',
})

const checker = async (file) => {

if(pdfData.sign1 == null || pdfData.sign2 == null){alert("missing signature"); return false}
if(file > 3) return true 
alert("you need to fill the Installateur section with min. 3 images!")
return false 

}

const sendForm = async () =>{
  
 const info = await checker(files.length)

 if(info === false) return

 setIsDisabled(true);

const formData = new FormData(); // create a new FormData instance
        
      
        //looping trough multiple files
        for (let i = 0; i < files.length; i++) {
            formData.append(`file${i}`, files[i]);
        }
        const pdfDataString = JSON.stringify(pdfData);
        formData.append("pdfData", pdfDataString)
        formData.append("Uid", Uid)
        formData.append("FolderContent", FolderContent)
        formData.append("textArea", textArea)

        console.log(formData)
        
        
axios.post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/formSign`, formData,{
    headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
    },
   }
)
.then(res=> {
  console.log(res)
    if(res.status == 200){
        alert("form sent correctly")
        router.push(`/`)
    }else{
      alert(res.status)
      console.log(res)
}
})
.catch(err => console.log(err))
} 



  return (
    <>
    
      <Layout>
    <FormInstallLK getFromData={callback} >
    </FormInstallLK>
    <Spacer y={5} />
    <Container style={{color: theme.colors.primary.value, margin: 'auto',}} gap={3}>

    <details open style={{color: "white", borderRadius: "10px", padding:"15px", }}> <summary>INSTALLATEUR SECTION</summary>
    <Spacer y={1} />
    <div {...getRootProps()} style={{padding: '20px', border: '2px dashed #ccc', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '20px 0'}}>
                <input {...getInputProps()} />
                {isDragActive ? 
                    <p>Drop the files here ...</p> :
                    <p>Click anc select 3 images</p>
                }
            </div>

            {files && files.map(file => (
                <p key={file.name}>{file.name}</p>
            ))}
    <Spacer y={.5} />
    <Textarea width ="100%" label="Notes" placeholder="Add Notes" value={textArea} onChange={e=> setTextArea(e.target.value)}/>
    </details>
    <Spacer y={5} />
    <Button onPress={sendForm} disabled={isDisabled}>Send</Button>
    <Spacer y={5} />
          </Container>
    </Layout>
    </>
  );
}
