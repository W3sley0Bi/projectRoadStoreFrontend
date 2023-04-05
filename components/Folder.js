
import {
    Link,
    Container,
    Row,
    Spacer
  } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Folder(prop){
    const router = useRouter()
    const role = useSelector((state) => state.role.value);
    const [deleteButton, setDeleteButton] = useState();


    useMemo(() => {
      if (role == 1) {
        setDeleteButton(
          <>        <Spacer y={.5}/>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828851.png"
            width="50px"
            height="50px"
            alt="delete"
          />
          </>
  
        );
      }
    },[])

    return(
<>
<Row>
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
            {deleteButton}
            </Row>
            </>
            )
}