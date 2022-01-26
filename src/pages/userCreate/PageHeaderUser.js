/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/pageHeader.css';

/* Images */
import alert from '../../assets/icons/alert.svg';

/*****************************************************************************/

let PageHeaderUser = (props) => {
  let isText;

  if (!props.isRefactoring) {
    isText = "Создать пользователя";
  } else {
    isText = "Редактировать пользователя";
  }

  return (
    <div className="pageHeader">
      <label className="mainLink">
        <a href="#">Главная</a> / <a href="#">
          <Link to="/userTable">Пользователи Post.kz /</Link>
        </a>
        <span>{isText}</span>
      </label>
      <h5>{isText}</h5>
      <div className="infoCreatePage">
        {
          !props.isRefactoring ? (
            <p>Вы можете создать новых пользователей</p>
          ) : (
            <p>Вы можете редактировать пользователей</p>
          )
        }
      </div>
    </div>

  )
}

export default PageHeaderUser;
