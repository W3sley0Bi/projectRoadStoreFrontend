
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {useTheme, NextUIProvider, Text } from "@nextui-org/react"
import Layout from '../components/Layout';
import { Container, Row, Col, Spacer } from '@nextui-org/react';
import { useSelector, useDispatch } from "react-redux";
import { fetchFun } from "../js/fetchFun";
import {inputCheckName ,inputCheckPass} from "../js/inputCheckers" 

export default function Registration(){
    const { theme } = useTheme();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputStatusUsername, setInputStatusUsername] = useState("");
    const [inputStatusPassword, setInputStatusPassword] = useState("");
    const token = useSelector((state) => state.token.value);
    const uid = useSelector((state) => state.uid.value);
    const role = useSelector((state) => state.role.value);
  // il ruolo viene aggiunto in automatico nella query dal db
  const router = useRouter()

  useMemo(() => {
    (async () => {
      //user role
      if (role*1 === 2) {
        router.push(`/userFolder/${uid}`);
      }

    })();
  },[]);

  const handleSubmit = async (event) => {
  if (inputCheckName(username) == "error" &&  inputCheckPassword(username) == "error" || username == "" && password == ""){
    alert("Input values not valid")
  }else{ 
    const res = await fetchFun("/registration", "POST", {username,name,surname, email,password}, token);
        alert(`user added correctly`)
        router.push('/')

  };
  };
  return (
    
<>
<Layout>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh",}}>
  <Container  gap={3} style={{color: theme.colors.primary.value, margin: 'auto',}}>
  <Col align="center">
  <h1>Register a new user</h1>
  <Spacer y={2} />
  <Row gap={1}>
  <Col  align="right">
  <Input
                  className="element"
                  labelPlaceholder="Username"
                  value={username}
                  bordered
                  status={inputStatusUsername}
                  onBlur={async () => setInputStatusUsername(await inputCheckName(username))}
                  onChange={(e) => setUsername(e.target.value)}
                />
  <Spacer y={1.2} />
  <Input  className="element" labelPlaceholder="Name"  value={name} disabled onChange={(e) => setName(e.target.value)} />
  <Spacer y={1.2} />
  <Input  className="element" labelPlaceholder="Surname"  value={surname} disabled onChange={(e) => setSurname(e.target.value)} />
  
  </Col>
  <Col  align="left">
  <Input  className="element" type="emal" labelPlaceholder="Email"  disabled value={email} onChange={(e) => setEmail(e.target.value)} />
  <Spacer y={1.2} />
  <Input.Password

                  className="element"
                  labelPlaceholder="Password"
                  value={password}
                  bordered
                  status={inputStatusPassword}
                  onBlur={async () => setInputStatusPassword(await inputCheckPass(password))}
                  onChange={(e) => setPassword(e.target.value)}
                />
  <Spacer y={1.2} />
  <Input  className="element" labelPlaceholder="Role" disabled value={2} />
  
  </Col>
  </Row>
  <Spacer y={1} />
  <Button className="element" onClick={handleSubmit}> Register </Button>
  </Col>
  
  </Container>

  </div>
    
</Layout>

    </>
  );
};


