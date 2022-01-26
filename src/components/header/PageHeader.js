/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../../pages/style/pageHeader.css';

/* Images */
import alert from '../../assets/icons/alert.svg';

/*****************************************************************************/

export default function PageHeader() {
  return (
    <div className="pageHeader">
      <label> Главная / <span>Пользователи Post.kz</span></label>
      <h5>Пользователи Post.kz</h5>
      <div className="alert alert-primary" role="alert" id="alert">
        <p><img src={alert} id="alert" alt={"alert"} />Пользователи системы по времени регистрации в порядке
          убывания</p>
        <a href="">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <div className="flex flex-column"></div>
            <path
              d="M7.86858 8L11.9701 3.11094C12.0389 3.02969 11.9811 2.90625 11.8748 2.90625H10.628C10.5545 2.90625 10.4842 2.93906 10.4358 2.99531L7.05296 7.02812L3.67015 2.99531C3.62327 2.93906 3.55296 2.90625 3.47796 2.90625H2.23108C2.12483 2.90625 2.06702 3.02969 2.13577 3.11094L6.23733 8L2.13577 12.8891C2.12037 12.9072 2.11049 12.9293 2.1073 12.9529C2.10412 12.9764 2.10776 13.0004 2.11779 13.022C2.12783 13.0435 2.14383 13.0617 2.16392 13.0745C2.184 13.0872 2.20731 13.0939 2.23108 13.0938H3.47796C3.55139 13.0938 3.62171 13.0609 3.67015 13.0047L7.05296 8.97188L10.4358 13.0047C10.4826 13.0609 10.553 13.0938 10.628 13.0938H11.8748C11.9811 13.0938 12.0389 12.9703 11.9701 12.8891L7.86858 8Z"
              fill="black" fill-opacity="0.45" />
          </svg>
        </a>

      </div>
    </div>
  );
}