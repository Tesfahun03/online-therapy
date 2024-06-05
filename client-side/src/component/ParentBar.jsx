import React, { useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

export default function ParentComponent() {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  
    const toggleOffcanvas = () => {
      setIsOffcanvasOpen(!isOffcanvasOpen);
    };
  
    return (
      <div className="parent-container">
        <NavBar toggleOffcanvas={toggleOffcanvas} />
        <SideBar isOffcanvasOpen={isOffcanvasOpen} />
      </div>
    );
  }