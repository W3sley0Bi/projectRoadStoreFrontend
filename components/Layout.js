// components/layout.js

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Link, Text, Avatar, Dropdown, Button, Card, Radio  } from "@nextui-org/react";
// import { AcmeLogo } from "./AcmeLogo.js";
// import { VariantsSelectorWrapper } from "./VariantsSelectorWrapper.js";



export default function Layout({ children }) {

  const uid = useSelector((state) => state.uid.value);

   

//  const uid = useSelector((state) => state.uid.value);
  const router = useRouter()

    const collapseItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
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
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="primary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link isActive href="/">HOME</Navbar.Link>
          <Navbar.Link href="Registration">User Registration</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
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
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src={`https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${uid}`}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            
            <Dropdown.Menu
              aria-label="User menu actions"
              color="primary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                {uid}
                
                </Text>
              </Dropdown.Item>
              {/* <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item> */}
            
              <Dropdown.Item key="logout" withDivider color="error"  >
              <Link onPress ={() => {
                     (() =>{ localStorage.removeItem('token');
                      localStorage.removeItem('uid');
                      router.push('/Login')
                    })
              }} >
                Log Out
                </Link>
         
              </Dropdown.Item>
            
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        {/* <Navbar.Collapse> THIS IS BRAKING EVERYTHING
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="primary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                  minHeight: "100%",                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse> */}
      </Navbar>
      <main style={{margin: '3%'}}>{children}</main>

    </>
  )
}