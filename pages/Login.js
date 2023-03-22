
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${process.env.NEXT_PUBLIC_NODE_SERVER}/workers`, {
            headers:{
                Authorization: token,
            }
        })
        .then(res=> {
            console.log(res)
            router.push('/')
})
        .catch(err=> {
            console.log(err)
        //if the user is not authenticated (if there is no token )...
        router.push("/login") // redirect
        })
    })

  const handleSubmit = (event) => {
    //event.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/login`, { username, password })
    .then(user=> {
        console.log(user)
        localStorage.setItem('token', user.data.token) // porpblem with the token update
        router.push('/')
    })
    .catch(err => console.log(err))
  };

  return (
    <>
    <div className="registration-container">
     <h1>Login</h1>

     <Input className="element" labelPlaceholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} />
     <Input.Password className="element" labelPlaceholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
     <Button className="element" onClick={handleSubmit}> Login </Button>

     <style jsx>{`
       .registration-container {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         height: 100vh;
         
       }

       .element{
           margin:100vh
       }

       // h1 {
       //   font-size: 2rem;
       //   margin-bottom: 2rem;
       // }

       // @media (max-width: 768px) {
       //   h1 {
       //     font-size: 1.5rem;
       //   }
       // }
     `}</style>
   </div>

   </>
  );
};