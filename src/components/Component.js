/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Components */
import NavSidebar from "./sidebar/NavSidebar";
import Header from "./header/Header";
import PageWrapper from "./wrapper/PageWrapper";

/* Styles */
import './style/component.css';

/*****************************************************************************/

function Component() {
  return (
    <>
      <div className="fixed-top">
        <Header />
        <NavSidebar />
      </div>
    </>
  )
}

export default Component;
