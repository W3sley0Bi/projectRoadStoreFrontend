
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {useTheme, NextUIProvider, Text } from "@nextui-org/react"
import Layout from '../components/Layout';
import { Container, Row, Col, Spacer } from '@nextui-org/react';

export default function Registration(){
    const { theme } = useTheme();
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  // il ruolo viene aggiunto in automatico nella query dal db
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('token');
    // NEX_PUBLIC to expose the env variable
    // console.log(process.env.NEXT_PUBLIC_NODE_SERVER)
  }, []);

  const handleSubmit = (event) => {
    //event.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/registration`, { username, password })
      .then((user) => {
        console.log(user)
       // localStorage.setItem('token', user.data.token);
        router.push('/Login')
      })
      .catch((err) => console.log(err));
  };

  return (
    
<>
<Layout>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", }}>
  <div style={{border: "2px solid white", padding: '4%'}}>
  <Container  gap={3} style={{color: theme.colors.primary.value, margin: 'auto',}}>
  <Col align="center">
  <h1>Register a new user</h1>
  <Spacer y={2} />
  <Row gap={1}>
  <Col  align="right">
  <Input  className="element" labelPlaceholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} />
  <Spacer y={1.2} />
  <Input  className="element" labelPlaceholder="Surname"  value={surname} onChange={(e) => setUsername(e.target.value)} />
  
  </Col>
  <Col  align="left">
  <Input  className="element" type="emal" labelPlaceholder="Email"  value={email} onChange={(e) => setUsername(e.target.value)} />
  <Spacer y={1.2} />
  <Input.Password className="element" labelPlaceholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
  </Col>
  </Row>
  <Spacer y={1} />
  <Button className="element" onClick={handleSubmit}> Login </Button>
  </Col>
  
  </Container>
  </div>
  </div>
    
</Layout>

    </>
  );
};


