import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Link, Text, Avatar, Dropdown, Button, Card, Radio  } from "@nextui-org/react";
import { ActioKeyNav } from "../js/ActioKeyNav";
import { useRouter } from "next/router";
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import  SunIcon  from './SunIcon';
import  MoonIcon  from './MoonIcon';

export default function NavbarComp(){

    const uid = useSelector((state) => state.uid.value);
    const role = useSelector((state) => state.role.value);
    const [userImg,setUserImg] = useState("")
    const [userReg,setUserReg] = useState("")
    const router = useRouter()
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();
    
    useEffect(()=>{
        if(uid !=undefined){
       let av = <Avatar
                      bordered
                      as="button"
                      color="primary"
                      size="md"
                      src={`https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${uid}`}
                    />

                    setUserImg(av)
        }
        //display user registration if admin
        if(role == 1){
            let buttonReg = <Navbar.Link onClick={()=> router.push("/Registration")}>User Registration</Navbar.Link>
            setUserReg(buttonReg)
        }


    },[uid])


        const collapseItems = [
            "Home",
            "Profile",
            "Help & Feedback",
            "Log Out",
          ];
    
    
    
      return (
        
        <>
      
       <Navbar isBordered variant="sticky">
        
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
              css={{
                "@xs": {
                  w: "12%",
                },
              }}
            >
              {/* <AcmeLogo /> */}
              <Text b color="inherit" hideIn="xs">
                RoadStore Beta v1.0.0
                <br/>
              </Text>
            </Navbar.Brand>
            <Navbar.Content
              enableCursorHighlight
              activeColor="primary"
              hideIn="xs"
              variant="highlight-rounded"
            >
                                
              <Navbar.Link onClick={() => router.push("/")}>Home</Navbar.Link>
              {userReg}
              <Navbar.Link href="#">Messages</Navbar.Link>
              <Navbar.Link href="#">Company</Navbar.Link>
    
            </Navbar.Content>
            <Navbar.Content
              css={{
                "@xs": {
                  w: "12%",
                  jc: "flex-end",
                },
              }}
            >
              <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          iconOn={<MoonIcon filled />}
          iconOff={<SunIcon filled />}
        />
              <Dropdown placement="bottom-right">
 
                <Navbar.Item>
        
                  <Dropdown.Trigger>
                    {userImg}
                  </Dropdown.Trigger>
                </Navbar.Item>
                
                
                <Dropdown.Menu
                  aria-label="User menu actions"
                  color="primary"
                  onAction={(actionKey) => ActioKeyNav(actionKey)}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                    {uid}
                    
                    </Text>
                  </Dropdown.Item>
                
                  <Dropdown.Item key="logout" withDivider color="error">
                    Log Out
                  </Dropdown.Item>
                
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
            <Navbar.Collapse> 
              {collapseItems.map((item, index) => (
                <Navbar.CollapseItem
                  key={item}
                  activeColor="primary"
                  css={{
                    color: index === collapseItems.length - 1 ? "$error" : index == 1 || index == 2? "#242424" : "", 
                  }}
                 

                >
                  <Link
                    color="inherit"
                    css={{
                      minWidth: "100%",
                      minHeight: "100%", 
                    
                      }}
                    onClick={()=>{switch (item) {
                      case "Log Out":
                        ActioKeyNav("logout")
                        break;
                      case "Home":
                        router.push("/")
                          break;
                      default:
                        break;
                    }}}
                  >
                    {item}
                  </Link>
                </Navbar.CollapseItem>
              ))}
            </Navbar.Collapse>
            
          </Navbar>
          
         
          </>
          )
}