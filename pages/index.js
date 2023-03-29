import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import { Button, Grid, Card, Text, Row, Spacer, Link } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../stores/store";
import Layout from "../components/Layout";
import UserCard from "../components/UserCard";
import { fetchFun } from "../js/fetchFun";
import Loader from "../components/Loader"

export default function Home() {
  const [workers, setWorkers] = useState(<Loader></Loader>);
  const token = useSelector((state) => state.token.value);
  const uid = useSelector((state) => state.uid.value);
  const role = useSelector((state) => state.role.value);
  let router = useRouter();




  useEffect(() => {
    if(navigator != undefined){
      console.log(navigator.platform) 
      console.log(navigator.userAgent)}
    (async () => {
      //user role
      if (role*1 === 2) {
        router.push(`/userFolder/${uid}`);
      }else{
      const res = await fetchFun("/workers", "GET", {}, token);
      console.log(res)
     // alert(res)
      if (res === 401) {
        router.push("/Login");
      } else {
        const items = res.result.map((person) => (
          <UserCard
            key={person.idUser}
            id={person.idUser}
            name={person.name}
          ></UserCard>
        ));
       setWorkers(items);
      }
    }
    })();
  }, []);

  return (
    <>
      <style jsx>
        {`
        .gridContainer{
            justify="flex-start"
        }`}
      </style>
      <Layout>
        <Grid.Container gap={2} className="gridContainer">
          {workers}
         
        </Grid.Container>
      </Layout>
    </>
  );
}
