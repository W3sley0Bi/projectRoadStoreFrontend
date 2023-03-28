
import {
    Link,
    Container,
  } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function Folder(prop){
    const router = useRouter()
    return(

    <Container
              key={prop.idFolder}
              style={{
                backgroundColor: "#1F2122",
                borderRadius: "15px",
                marginBottom: "10px",
              }}
            >
              <Link onClick={() => router.push(`/userFolder/${prop.Uid}/${prop.idFolder}`)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/716/716784.png "
                  style={{ width: "15%", marginRight: "10%" }}
                />
                <div style={{ flexDirection: "column" }}>
                  <p style={{ color: "white" }}>ID: {prop.idFolder}</p>
                  <p style={{ color: "white" }}>Name: {prop.name}</p>
                </div>
              </Link>
            </Container>
            )
}