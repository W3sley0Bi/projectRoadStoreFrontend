// components/layout.js

import React, { useEffect, useState } from "react";
import NavbarComp from "../components/NavbarComp"



export default function Layout({ children }) {

return(
  <>
  <NavbarComp></NavbarComp>
      <main style={{margin: '3%'}}>{children}</main>
      </>

  )
}