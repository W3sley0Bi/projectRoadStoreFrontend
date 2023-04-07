import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Link, Text, Avatar, Dropdown, Button, Card, Radio, Spacer, Container  } from "@nextui-org/react";
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
    const [logo,setLogo] = useState({filter:"none"})
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

        if(localStorage.getItem('theme')=="dark"){
          setLogo({filter:"invert(1)"})
        }

    },[uid])


        const collapseItems = [
            "Home",
            "Profile",
            "Company",
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
                  w: "15pc",
                },
              }}
            >
              {/* <AcmeLogo /> */}
              <Text hideIn="xs" >
              <img  src="https://lk-distribution.fr/wp-content/uploads/2014/12/cropped-logo-LK-300.png" style={logo} alt="" />
              </Text>
              <Spacer y={2}/>
              <Text b color="inherit" hideIn="xs">
                 Beta v1.0.0
  
              </Text>
            </Navbar.Brand>
            
          <div  onClick={()=> history.back()} className="backButton" style={{
                border: "2px solid",
                borderRadius: "23px",
                padding: "6px 6px 0px 6px"
            }
          }>
            <svg style={{transform: "rotate(180deg)"}} height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" class="chevron-right-icon"><g fill="none" stroke="var(--nextui-colors-secondary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="chevron-right-icon"><path d="M14.43 5.93L20.5 12l-6.07 6.07"></path><path d="M3.5 12h16.83"></path></g></svg>
          </div>  
          <div  onClick={()=> router.push("/")} className="backButton" style={{
                border: "2px solid",
                borderRadius: "23px",
                padding: "6px 6px 0px 6px"
            }
          }>
          <img src="	https://cdn-icons-png.flaticon.com/512/553/553416.png" width="20px" alt="" />
          </div>  
          <div  onClick={()=> location.reload()} className="backButton" style={{
                border: "2px solid",
                borderRadius: "23px",
                padding: "6px 6px 0px 6px"
            }
          }>
          <img src="https://cdn-icons-png.flaticon.com/512/179/179407.png" width="20px" alt="" />
          </div>  
            <Navbar.Content
              enableCursorHighlight
              activeColor="primary"
              hideIn="xs"
              variant="highlight-rounded"
            >
                                
              <Navbar.Link onClick={() => router.push("/")}>Home</Navbar.Link>
              {userReg}
              <Navbar.Link href="mailto:roadstore.noreply@gmail.com">Help & Feedback</Navbar.Link>
              <Navbar.Link href="https://lk-distribution.fr/" target="_blank">Company</Navbar.Link>
    
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
                    color: index === collapseItems.length - 1 ? "$error" : index == 1? "#242424" : "", 
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
                      case "Company":
                        window.open(`https://lk-distribution.fr/`)
                          break;
                      case "Help & Feedback":
                        window.location.replace(`mailto:roadstore.noreply@gmail.com`)
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