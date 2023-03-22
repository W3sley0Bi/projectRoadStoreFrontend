import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import FileModal from "../../../components/FileModal"

export default function FolderContent(){

    const router = useRouter()
    const { Uid,FolderContent } = router.query


    const [file, setFile] = useState([])

  

    useEffect(()=>{
        if(!router.isReady) return;
        // codes using router.query

        const token = localStorage.getItem('token')

       // retrive folders from filesystem
        axios.get(`${process.env.NEXT_PUBLIC_NODE_SERVER}/userFolder/${Uid}/${FolderContent}`, {
                headers:{
                    Authorization: token,
                }
            })
            .then(res=> { 
                
                console.log(res.data)
                // assigned_worker_id

                const file = res.data.map(item => 
 
                    <FileModal key={item.idFile} idFile={item.idFile} file_name={item.file_name} file_path={item.file_path} ></FileModal>
                    
                    );
        
                    setFile(file) 

            }).catch(err=> {
            console.log(err)
            //if the user is not authenticated (if there is no token )...
                alert("error")
            router.push("/Login") // redirect
        })

    
    
    }, [router.isReady]);


    return( 
        <>
        
        <div>{file}</div>
        </>
    )
}