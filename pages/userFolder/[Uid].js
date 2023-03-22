import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import RedirectHandler from "../../components/RedirectHandler"
import { useDropzone } from 'react-dropzone';


export default function UserFolders(){

    const router = useRouter()
    const { Uid } = router.query
    const [folder, setFolder] = useState("")
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState("")

    useEffect(()=>{
        if(!router.isReady) return;
        // codes using router.query

        const token = localStorage.getItem('token')

       // retrive folders from filesystem
        axios.get(`${process.env.NEXT_PUBLIC_NODE_SERVER}/userFolder/${Uid}`, {
                headers:{
                    Authorization: token,
                }
            })
            .then(res=> { 
                console.log(res.data.result)

                const folders = res.data.result.map(item => 
                    <a style={{borderColor: 'black'}} href={`/userFolder/${Uid}/${item.idFolder}`}>
                    <div key={item.idFolder}>
                      <p>folder id: {item.idFolder}</p>
                      <p>folder name: {item.name}</p>
                      <p>assigned worker id: {item.assigned_worker_id}</p>
                      <br/>
                      </div>
                    </a>
                  
                  
                    );
        
                    setFolders(folders) 
                  
            }).catch(err=> {
            console.log(err)
            //if the user is not authenticated (if there is no token )...
           // router.push("/Login") // redirect
        })
    
    }, [router.isReady]);

    //sumbit forma data
    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(); // create a new FormData instance
        formData.append("folder", folder); // append the folder value
        
        //looping trough multiple files
        for (let i = 0; i < files.length; i++) {
            formData.append(`file${i}`, files[i]);
        }
        formData.append("idUser", Uid)

        const token = localStorage.getItem('token')

        axios.post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/addfile`, formData, {
            headers:{
                Authorization: token,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(user=> {
            console.log(user)
        })
        .catch(err => console.log(err))
    };

    return(
        <>
        <RedirectHandler route={`${Uid}/AddFiles`} >  + AddFiles </RedirectHandler>
       
    
           <p>UserID: {Uid}</p> 
           <br/>
            {folders}
 
        </>
    )
}
