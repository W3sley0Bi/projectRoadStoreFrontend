import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useTheme, Text } from "@nextui-org/react";
import { Container, Row, Col, Spacer } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../stores/store";
import { setUID } from "../stores/store";
import { fetchFun } from "../js/fetchFun";
import { settingOnLoginStorage } from "../js/settingOnLoginStorage"
import {inputCheckName ,inputCheckPass} from "../js/inputCheckers" 
//import InvalidInputModal from "../components/InvalidInputModal"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputStatusUsername, setInputStatusUsername] = useState("");
  const [inputStatusPassword, setInputStatusPassword] = useState("");

  const router = useRouter();
  const { theme } = useTheme();
  const token = useSelector((state) => state.token.value);
  // const uid = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetchFun("/workers", "GET", {}, token);

      if (res !== 401) {
        dispatch(setToken(token));
        router.push("/");
      }
    })();
  },[]);

  const handleSubmit = async () => {
        if (inputCheckName(username) == "error" &&  inputCheckPassword(username) == "error" || username == "" && password == ""){
          alert("Input values not valid")
        }else{ 
          const res = await fetchFun("/login", "POST", {username,password}, token);
          console.log(res)
          settingOnLoginStorage(dispatch, res.token,res.userData.Uid,res.userData.Role)
        }
      };

      
  

  return (
    <>
          {/* <style jsx>{`
        .divContainer{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }`
      }
      </style> */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Container
          gap={0}
          style={{ color: theme.colors.primary.value, margin: "auto" }}
        >
          <Col align="center">
            <h1>Login</h1>
            <Spacer y={2} />
            <Row gap={1}>
              <Col align="right">
                <Input
                  className="element"
                  labelPlaceholder="Username"
                  value={username}
                  bordered
                  status={inputStatusUsername}
                  onBlur={async () => setInputStatusUsername(await inputCheckName(username))}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
              <Col align="left">
                <Input.Password

                  className="element"
                  labelPlaceholder="Password"
                  value={password}
                  bordered
                  status={inputStatusPassword}
                  onBlur={async () => setInputStatusPassword(await inputCheckPass(password))}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>
            <Spacer y={1} />
            <Button className="element" onClick={handleSubmit}>
              {" "}
              Login{" "}
            </Button>
          </Col>
        </Container>
      </div>
    </>
  );
}
