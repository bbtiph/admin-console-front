/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Images */
import loader from "./../../assets/loader/loader.gif";

/*****************************************************************************/

let Preloader = (props) => {
  return (
    <div style={{ marginLeft: '43%' }}>
      {
        props.isFetching ? <img src={loader} alt="" /> : null
      }
    </div>
  );
}

export default Preloader;