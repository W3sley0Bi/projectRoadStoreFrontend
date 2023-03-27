
import {
    Link,
    Container,
  } from "@nextui-org/react";

export default function Folder(prop){
    
    return(

    <Container
              key={prop.idFolder}
              style={{
                backgroundColor: "#1F2122",
                borderRadius: "15px",
                marginBottom: "10px",
              }}
            >
              <Link href={`/userFolder/${prop.Uid}/${prop.idFolder}`}>
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