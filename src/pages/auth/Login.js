/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import jwt from 'jwt-decode';
import swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/login.css';

/* Images */
import logoLogin from '../../assets/icons/icons-hover/logoLogin.svg';

/*****************************************************************************/

function Login({ history }) {
  let login = React.createRef();
  let password = React.createRef();
  let body;

  function onchange() {
    body = {
      'login': login.current.value,
      'password': password.current.value
    };

    console.log("body >> ", body);
  }

  const log = async (e) => {
    try {
      const res = await axios.get(`/admin-console-app/auth/login`, {
      // const res = await axios.get(`/auth/login`, {
        auth: {
          username: body.login,
          password: body.password,
        }
      });

      console.log("dd>>>", res);

      if (res.status >= 200 && res.status <= 299) {
        const user = jwt(res.data.token); // decode y

        console.log('token ->>>', user);

        localStorage.setItem('token', JSON.stringify(res.data.token));
        localStorage.setItem('roles', user.roles);

        history.push('/userTable');
      }
      else {
        swal.fire(
          ('Ошибка'),
          ('ваш логин или пароль неверный'),
          'error',
        );
      }
    } catch (err) {
      swal.fire(
        ('Ошибка'),
        ('Ваш логин или пароль неверный'),
        'error',
      );
    }
  }

  return (
    <body className="text-center">
      <main className="form-signin">
        <form>
          <h1 className=""><img src={logoLogin} alt={"logo"} /> Post Admin</h1>
          <p>Войдите в свой аккаунт</p>
          <hr />
          <div className="input-login">
            <input ref={login} className="user" onChange={onchange} type="text" placeholder="Логин" />
          </div>

          <div className="input-login ">
            <input ref={password} className="user" onChange={onchange} type="password" placeholder="Пароль" />
          </div>

          <button onClick={log} className="w-100 btn btn-lg btn-primary" type="button" value="register">
            Войти
          </button>
        </form>
      </main>
    </body>
  );
}

export default withRouter(Login);
