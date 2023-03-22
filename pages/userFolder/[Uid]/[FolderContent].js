import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

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
                
                console.log(res.data.fileNames)
                let i = 0
                const file = res.data.fileNames.map(item => 
                    // questo sará poi id del file e non il nome della cartella
                    <a style={{borderColor: 'black'}} href={`/userFolder/${Uid}/${FolderContent}/${item}`}> 
                    <div key={i++}>
                      <p>filename: {item}</p>
                    <br/>
                      </div>
                    </a>
                 
                  
                    );

                    i = 0
        
                    setFile(file) 

            }).catch(err=> {
            console.log(err)
            //if the user is not authenticated (if there is no token )...
           // router.push("/Login") // redirect
        })
    
    }, [router.isReady]);


    return( 
        <>
        <p>{file}</p>
        </>
    )
}