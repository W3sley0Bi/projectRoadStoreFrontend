import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Button } from '@nextui-org/react';


export default function Home() {

  const [workers, setWorkers] = useState([])

  let router = useRouter()


  useEffect(() => {

    const token = localStorage.getItem('token')
    axios.get(`${process.env.NEXT_PUBLIC_NODE_SERVER}/workers`, {
            headers:{
                Authorization: token,
            }
        })
        .then(res=> { 

          const items = res.data.result.map(person => 
            
            <a style={{borderColor: 'black'}} href={`/userFolder/${person.idUser}`}>
            <div key={person.idUser}>
            <img src={`https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${person.idUser}`} width="50px" alt="" /> 
              <p>{person.idUser}</p>
              <p>{person.name}</p>
              <p>{person.email}</p>
              </div>
            </a>
            );

          setWorkers(items) 
          
            //router.push('/')
})
        .catch(err=> {
            console.log(err)
        //if the user is not authenticated (if there is no token )...
        router.push("/Login") // redirect
        })


    },[])

  return (
    <>

    
    {workers}


    </>
  )
}
