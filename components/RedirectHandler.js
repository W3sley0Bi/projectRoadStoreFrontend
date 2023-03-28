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
    <div key={prop.key} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Button onClick={handleAddRedirect}> {prop.children} </Button> 
    </div>
    </>
    )
}