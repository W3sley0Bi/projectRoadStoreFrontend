import { useTheme, NextUIProvider, Text, Textarea , Button, Spacer, Container} from "@nextui-org/react";
import Layout from "../../../../components/Layout";
import FormInstallLK from "../../../../components/FormInstallLK"
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import axios from 'axios'


export default function Form() {
  const router = useRouter()
    const { theme } = useTheme();
    const { Uid,FolderContent } = router.query
    const [pdfData, setPdfData] = useState()
    const token = useSelector((state) => state.token.value);
    const uid = useSelector((state) => state.uid.value);
    const role = useSelector((state) => state.role.value);

const callback = props => {
  setPdfData(props)
}

const sendForm = () =>{
  axios.post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/formSign`, {pdfData,Uid,FolderContent}, {
    headers:{
        Authorization: token,
        'Content-Type': 'multipart/form-data',
    }
})
.then(res=> {
  console.log(res)
  
//     if(res.status == 200){
//         alert("form sent correctly")
//         router.push(`/`)
//     }else{
//       alert(res.status)
//       console.log(res)
// }
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
      
    {/* <Textarea width ="100%" label="Notes" placeholder="Add Notes" /> */}
    <Button onPress={sendForm}>Send</Button>
          </Container>
    </Layout>
    </>
  );
}
