import Rect from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router'

export default function RedirectHandler(prop){
const router = useRouter()
    
const handleAddRedirect = () =>{
        router.push(prop.route)
    }

    
    return(
    <>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw" }}>
    <Button onClick={handleAddRedirect}> {prop.children} </Button> 
    </div>
    </>
    )
}