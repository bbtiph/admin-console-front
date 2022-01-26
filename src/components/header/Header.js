/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/header.css';

/* Images */
import logo from '../../assets/icons/icons-hover/logo.svg';
import adminLogo from '../../assets/icons/icons-hover/adminLogo.svg';
import logOut from '../../assets/icons/icons-hover/img.png';

/*****************************************************************************/

function Header({ history }) {
  return (
    <nav className="navbar" id="header">
      <div className="container-fluid">
        <div className="logo">
          <a className="navbar-brand" href="#"> <img src={logo} alt={"logo"} /><span>Post Admin</span></a>
        </div>

        <div className="admin">
          <Link className="navbar-brand" to="/login">
            <img src={adminLogo} alt={"logo"} />
            <span>Admin</span>
          </Link>

          <div className="navbar-brand" onClick={() => {
            localStorage.removeItem('token');
            history.push('/login');
          }}>
            <img src={logOut} alt={"logo"} style={{ height: '20px' }} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Header);