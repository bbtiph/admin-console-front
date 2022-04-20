/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert2";

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/userTable.css';

/* Images */
import reload from '../../assets/icons/reload.svg';
import add from '../../assets/icons/add.svg';
import warning from '../../assets/icons/warning.svg';
import x from '../../assets/icons/x.png';
import successDeletedLogo from '../../assets/icons/succesDeleted.svg';
import notSuccessDeletedLogo from '../../assets/icons/notSuccessDeleted.svg';
import alert1 from '../../assets/icons/alert.svg';

/* Components */
import PageHeader from "../../components/header/PageHeader";
import Search from "../../components/search/Search";
import Component from "../../components/Component";
import Modal from "../../Common/Modal/modal";
import CreateUser from "../userCreate/CreateUser";

/*****************************************************************************/

const IIN = "IIN";
const FIRST_NAME = "FIRST_NAME";
const MIDDLE_NAME = "MIDDLE_NAME";
const LAST_NAME = "LAST_NAME";
const MOBILE_NUMBER = "MOBILE_NUMBER";

const UserTable = (props) => {
  // ;

  const [isOpenResetPassModal, setIsOpenResetPassModal] = useState(false);
  const [isOpenChangePassModal, setIsOpenChangePassModal] = useState(false);
  const [isOpenModalSuccesDeleted, setIsOpenModalSuccessDeleted] = useState(false);
  const [isOpenModalRefactoringUser, setIsOpenModalRefactoringUser] = useState(false);
  const [isOpenModalNotSuccesDeleted, setIsOpenModalNotSuccesDeleted] = useState(false);
  const [isOpenModalSelectedMoreThanOne, setIsOpenModalSelectedMoreThanOne] = useState(false);
  const [isOpenModalDoneOperation, setIsOpenModalDoneOperation] = useState(false);
  const [isOpenModalSomeProblemOperation, setIsOpenModalSomeProblemOperation] = useState(false);
  const [isSelectedUser, setIsSelectedUser] = useState(null);
  const [usersLogin, setUsersLogin] = useState([]);
  const [isCountOfSelectedRows, setIsCountOfSelectedRows] = useState(0);

  const [isFirstPassword, setIsFirstPassword] = useState("");
  const [isSecondPassword, setIsSecondPassword] = useState("");

  const [isHidePassword, setIsHidePassword] = useState(true);

  const [isSomeParams, setIsSomeParams] = useState({ isTextForSearch: "", isFieldForSearch: "" });

  let isUser = {};

  let pagesCount = Math.ceil(props.usersPage.totalCount / 10);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const searchFunction = (someParams) => {
    // ;
    console.log(someParams.isTextForSearch, ' gtg ', someParams.isFieldForSearch);
    setIsSomeParams(someParams);
    console.log(isSomeParams.isTextForSearch, ' gttg ', isSomeParams.isFieldForSearch);
  }

  const closeModalRefactoring = () => {
    setIsOpenModalRefactoringUser(false);
  }

  let requestForChangePass = async (data, config) => {
    await axios.post(`/admin-console-app/crm-server/api/changePassword`, data, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          swal.fire(
            'Успешно',
            'Пароль успешно обновлен',
            'success',
          );
        } else {
          // ;
          alert("invalid");
        }
      }
    );
  }

  const changePassword = () => {
    if (localStorage.getItem('roles').includes("ROLE_ADMINS")) {
      if (isFirstPassword === isSecondPassword) {
        let data = {
          password: isFirstPassword,
          userDTO: isSelectedUser
        }
        const config = {
          headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        };
        requestForChangePass(data, config);
      } else {
        setIsOpenModalSomeProblemOperation(true);
      }
    } else {
      swal.fire(
        ('Ошибка'),
        ('Вы не можете изменить пароль.'),
        'error',
      );
    }
  }

  // let isCountOfSelectedRows = 0;

  // let usersLogin = [];
  let addUserToArray = (login) => {
    if (usersLogin.indexOf(login) == -1) {
      usersLogin.push(login);
      setIsCountOfSelectedRows(isCountOfSelectedRows+1);
    } else {
      usersLogin[usersLogin.indexOf(login)] = null;
      setIsCountOfSelectedRows(isCountOfSelectedRows-1);
    }
  }

  let selectingOnlyOneUser = (param) => {
    console.log('t>>', usersLogin, isCountOfSelectedRows)
    if (isCountOfSelectedRows == 1) {
      isListOfUsers.map((user, i) => {
        if (usersLogin.indexOf(user.login) != -1) {
          isUser = user;
          setIsSelectedUser(isUser);
          switch (param) {
            case 1:
              setIsOpenModalRefactoringUser(true);
              break;
            case 2:
              setIsOpenResetPassModal(true)
              break;
          }
        }
      })
    } else {
      setIsOpenModalSelectedMoreThanOne(true);
    }
  }

  let deleteUsers = () => {
    if (localStorage.getItem('roles').includes("ROLE_ADMINS")) {
      if (isFirstPassword === isSecondPassword) {
        let data = {
          logins: usersLogin
        }
        const config = {
          headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        };
        axios.post(`/admin-console-app/crm-server/api/deleteUsersByLogin`, data, config).then(
          res => {
            if (res.status >= 200 && res.status <= 299) {
              swal.fire(
                ('Успешно'),
                ('Пользователь удален'),
                'success',
              );
              props.history.push('/');
              props.history.replace('/userTable');
            } else {
              swal.fire(
                ('Ошибка'), (''), 'error',
              );
            }
          }
        );
      } else {
        setIsOpenModalSomeProblemOperation(true);
      }
    } else {
      swal.fire(
        ('Ошибка'),
        ('Вы не можете удалить.'),
        'error',
      );
    }
  }

  let isListOfUsers = props.usersPage.users;
  return (
    <>
      <Component />
      <div className="page-wrapper">
        <PageHeader />
        <Search fields={[{field: 'ИИН', value: IIN},
          {field: 'Имя', value: IIN},
          {field: 'Фамилия', value: IIN},
          {field: 'Номер мобильного телефона', value: IIN},
        ]}
          searchFunction={searchFunction}
          onChangePage={props.onChangePage} />
        <div className="userTable">
          <div className="upperTableToDo">
            <h5>Результаты поиска</h5>
            <div className="toDoButton">
              <a className="btn btn-primary"><img src={add} alt="" />
                <Link id="login-button" to="/userCreate">Создать</Link>
              </a>
              <a className="btn" id="btn-update" onClick={() => selectingOnlyOneUser(1)}>Редактировать</a>
              {/*<a className="btn" id="btn-update" onClick={deleteUsers}>Удалить</a>*/}
              <button id="btn-update" onClick={() => selectingOnlyOneUser(2)}>Сбросить пароль</button>
              <button style={{border: 'none'}} id="btn-reload"><img src={reload} alt="" onClick={() => {
                props.history.push('/');
                props.history.replace('/userTable');
              }} /></button>
            </div>
          </div>
          <div className="table-box">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value=""
                        id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                      </label>
                    </div>
                  </th>
                  <th scope="col">ИИН</th>
                  <th scope="col">ФИО</th>
                  <th scope="col">Логин</th>
                  <th scope="col">Дата рождения</th>
                  <th scope="col">Номер телефона</th>
                  <th scope="col">Электронный адрес</th>
                  <th scope="col">Дата регистрации</th>
                  {/*<th scope="col">Последняя авторизация</th>*/}
                  <th scope="col">Роль</th>
                  <th scope="col">Статус</th>
                </tr>
              </thead>
              <tbody>
                {
                  isListOfUsers.map((user, i) => (
                    <tr>
                      <td>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value=""
                            id="flexCheckDefault" onClick={() => {
                              addUserToArray(user.login);
                            }} />
                        </div>
                      </td>
                      <td><a >{user.iin ? user.iin : '-'}</a></td>
                      <td>{user.firstName + " " + user.lastName + " " + user.middleName}</td>
                      <td>{user.login ? user.login : '-'}</td>
                      <td>{(user.birthDate) ? user.birthDate.slice(0, 10) : '-'}</td>
                      <td>{user.mobileNumber ? user.mobileNumber : '-'}</td>
                      <td>{user.email ? user.email : '-'}</td>
                      <td>{user.createdDate ? user.createdDate.slice(0, 10) : '-'}</td>
                      {/*<td>{user.createdDate ? user.createdDate.slice(0, 10) : '-'}</td>*/}
                      <td>{user.roles[0] ? user.roles[0] : '-'}</td>
                      <td>{user.activated ? 'Активен' : 'Не активен'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <div className="pagination-box container-fluid">
            <nav>
              <ul className="pagination justify-content-end">
                <li className="page-counter"><a className="page-link">
                  {(props.usersPage.currentPage - 1) * 10 + 1}-{(props.usersPage.currentPage) * 10} их {pagesCount} страниц</a>
                </li>
                <li onClick={() => {
                  props.onChangePage({
                    pageNumber: props.usersPage.currentPage - (props.usersPage.currentPage - 1 >= 1 ? 1 : 0),
                    input: isSomeParams.isTextForSearch,
                    field: isSomeParams.isFieldForSearch
                  })
                }} className="page-item">
                  <a className="page-link "  aria-label="Previous">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.83959 2.06667V1.0314C6.83959 0.941669 6.73646 0.892116 6.66682 0.947026L0.629321 5.66265C0.578024 5.70254 0.536516 5.75362 0.507964 5.812C0.479411 5.87037 0.464569 5.9345 0.464569 5.99948C0.464569 6.06446 0.479411 6.12859 0.507964 6.18696C0.536516 6.24534 0.578024 6.29642 0.629321 6.33631L6.66682 11.0519C6.7378 11.1068 6.83959 11.0573 6.83959 10.9676V9.93229C6.83959 9.86667 6.80879 9.80372 6.75789 9.76354L1.93646 6.00015L6.75789 2.23542C6.80879 2.19524 6.83959 2.13229 6.83959 2.06667Z"
                        fill="#D9D9D9" />
                    </svg>
                  </a>
                </li>
                {
                  pages.slice(props.usersPage.currentPage - 1, props.usersPage.currentPage + 5).map((page) => {
                    return (

                      <li onClick={() => {
                        props.onChangePage({
                          pageNumber: page,
                          input: isSomeParams.isTextForSearch,
                          field: isSomeParams.isFieldForSearch
                        })
                      }} className="page-item">
                        <a className="page-link" >
                          <p className={props.usersPage.currentPage === page ? "selected" : ""}>
                            {page}
                          </p>
                        </a>
                      </li>
                    )
                  }
                  )
                }
                <li className="page-skipper"><a className="page-link">
                  <svg width="19" height="4" viewBox="0 0 19 4" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.882812 2.09222C0.882812 1.61371 1.05143 1.20583 1.38867 0.868591C1.73047 0.531352 2.13835 0.362732 2.6123 0.362732C3.09082 0.362732 3.4987 0.531352 3.83594 0.868591C4.17773 1.20583 4.34863 1.61371 4.34863 2.09222C4.34863 2.57074 4.17773 2.9809 3.83594 3.32269C3.4987 3.65993 3.09082 3.82855 2.6123 3.82855C2.13835 3.82855 1.73047 3.65993 1.38867 3.32269C1.05143 2.9809 0.882812 2.57074 0.882812 2.09222ZM7.79102 2.09222C7.79102 1.61371 7.95964 1.20583 8.29688 0.868591C8.63867 0.531352 9.04655 0.362732 9.52051 0.362732C9.99902 0.362732 10.4069 0.531352 10.7441 0.868591C11.0859 1.20583 11.2568 1.61371 11.2568 2.09222C11.2568 2.57074 11.0859 2.9809 10.7441 3.32269C10.4069 3.65993 9.99902 3.82855 9.52051 3.82855C9.04655 3.82855 8.63867 3.65993 8.29688 3.32269C7.95964 2.9809 7.79102 2.57074 7.79102 2.09222ZM14.6992 2.09222C14.6992 1.61371 14.8678 1.20583 15.2051 0.868591C15.5469 0.531352 15.9548 0.362732 16.4287 0.362732C16.9072 0.362732 17.3151 0.531352 17.6523 0.868591C17.9941 1.20583 18.165 1.61371 18.165 2.09222C18.165 2.57074 17.9941 2.9809 17.6523 3.32269C17.3151 3.65993 16.9072 3.82855 16.4287 3.82855C15.9548 3.82855 15.5469 3.65993 15.2051 3.32269C14.8678 2.9809 14.6992 2.57074 14.6992 2.09222Z"
                      fill="black" fill-opacity="0.25" />
                  </svg>
                </a></li>
                {
                  pages.slice(pagesCount - 6, pagesCount - 1).map((page) => {
                    return (
                      <li onClick={() => {
                        props.onChangePage({
                          pageNumber: page,
                          input: isSomeParams.isTextForSearch,
                          field: isSomeParams.isFieldForSearch
                        })
                      }} className="page-item">
                        <a className="page-link" >
                          <p
                            className={props.usersPage.currentPage === page ? "selected" : ""}>
                            {page}
                          </p>
                        </a>
                      </li>
                    )
                  }
                  )
                }
                <li onClick={() => {
                  props.onChangePage({
                    pageNumber: props.usersPage.currentPage + (props.usersPage.currentPage + 1 <= pagesCount ? 1 : 0),
                    input: isSomeParams.isTextForSearch,
                    field: isSomeParams.isFieldForSearch
                  })
                }} className="page-item">
                  <a className="page-link"  aria-label="Next">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.39777 5.66323L0.360269 0.947601C0.344493 0.93518 0.325533 0.927462 0.305568 0.925331C0.285603 0.9232 0.265441 0.926744 0.247399 0.935555C0.229357 0.944367 0.214166 0.958088 0.203571 0.975144C0.192976 0.992199 0.187406 1.0119 0.187501 1.03198V2.06724C0.187501 2.13287 0.218305 2.19581 0.269198 2.23599L5.09063 6.00073L0.269198 9.76546C0.216966 9.80564 0.187501 9.86858 0.187501 9.93421V10.9695C0.187501 11.0592 0.290626 11.1088 0.360269 11.0539L6.39777 6.33823C6.44908 6.2982 6.4906 6.247 6.51915 6.18851C6.5477 6.13003 6.56254 6.06581 6.56254 6.00073C6.56254 5.93565 6.5477 5.87142 6.51915 5.81294C6.4906 5.75446 6.44908 5.70325 6.39777 5.66323Z"
                        fill="black" fill-opacity="0.85" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </div>
      {
        isOpenResetPassModal ? (
          <Modal center="center" maxWidth="605px" close={() => {
            setIsOpenResetPassModal(false);
          }}>
            <div className="resetPassModal">
              <div className="logoResetPassModal">
                <img src={alert1} alt="" style={{ color: "red" }} />
              </div>
              <div className="someTextResetPassModal">
                <p className="text1ResetPassModal">
                  Сбросить пароль
                </p>
                <p className="text2ResetPassModal">
                  Вы уверены что хотите сбросить пароль?
                </p>
              </div>
            </div>
            <div className="function-group mb-3">
              <div className="actionsResetPassModal">
                <button type="button" className="btn" id="apply" style={{ fontSize: '13px' }} onClick={() => {
                  setIsOpenResetPassModal(false)
                  setIsOpenChangePassModal(true)
                }}>Сбросить пароль</button>
                <button type="button" className="btn" id="apply" style={{ fontSize: '13px' }} onClick={() => {
                  const config = {
                    headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
                  };

                  let endpoint = '/admin-console-app/crm-server/api/reset-password';

                  const queryString = new URLSearchParams();
                  queryString.set('login', isSelectedUser.login ?? "");
                  queryString.set('type', "login");

                  axios.get(`${endpoint}?${queryString.toString()}`, config).then(
                    res => {
                      if (res.status >= 200 && res.status <= 299) {
                        swal.fire(('Успешно'), '', 'success');
                      } else {
                        swal.fire(
                          ('Ошибка'),
                          ('Ваш токен не валидный.'),
                          'error',
                        );
                      }
                    }
                  ).catch(() => {
                    swal.fire(
                      ('Ошибка'),
                      ('Ваш токен не валидный.'),
                      'error',
                    );
                  });
                }}>
                  Обнулить счетчик набора пароля
                </button>
                <button className="btn" id="discharge" style={{ fontSize: '13px' }}
                  onClick={() => setIsOpenResetPassModal(false)}>Назад</button>
              </div>
            </div>
          </Modal>
        ) : null
      }
      {
        isOpenChangePassModal ? (
          <Modal title="Введите временный пароль"
            center="center" maxWidth="605px" close={() => setIsOpenChangePassModal(false)}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type={isHidePassword ? "password" : "text"} placeholder="Введите пароль"
                  onChange={(event) =>
                    setIsFirstPassword(event.target.value)
                  } />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type={isHidePassword ? "password" : "text"} placeholder="Повторите пароль"
                  onChange={(event) =>
                    setIsSecondPassword(event.target.value)
                  }/>
              </Form.Group>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" value=""
                       id="flexCheckDefault" onClick={() => {
                  setIsHidePassword(!isHidePassword);
                }} /> Показать пароль
              </div>

              <br/>

              <Button variant="primary" type="button" style={{ marginLeft: '442px' }} onClick={() => {
                if (isFirstPassword != isSecondPassword) {
                  swal.fire(
                    ('Ошибка'),
                    ('Пароли не совпадают.'),
                    'error',
                  );
                } else if (isFirstPassword.length < 8) {
                  swal.fire(
                    ('Ошибка'),
                    (''),
                    'error',
                  );
                } else {
                  changePassword();
                }
              }}>
                Сбросить
              </Button>
            </Form>
          </Modal>
        ) : null
      }

      {
        isOpenModalSuccesDeleted ? (
          <Modal size="medium" center="center">
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <img src={successDeletedLogo} alt="" />
            </div> <br />
            <p className="text2SuccessDeletedModal">Учетная запись успешно удалена!</p>
            <p className="text1SuccessDeletedModal">Учетная запись перенесена в корзину</p> <br /><br />
            <div className="function-group mb-3">
              <div className="actionsSuccessDeletedModal">
                <button className="btn" id="apply" style={{ fontSize: '13px' }}
                  onClick={() => setIsOpenModalSuccessDeleted(false)}>Назад</button>
                <button className="btn" id="discharge" style={{ fontSize: '13px' }}>Корзина</button>
              </div>
            </div>
          </Modal>
        ) : null
      }

      {
        isOpenModalNotSuccesDeleted ? (
          <Modal size="medium" center="center">
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <img src={notSuccessDeletedLogo} alt="" />
            </div> <br />
            <p className="text2SuccessDeletedModal">Неуспешно</p>
            <p className="text1NotSuccessDeletedModal">Необходимо проверить корректность введенных данных.</p> <br />
            <div className="modalDescNotSuccessDeleted">
              <p className="text1ResetPassModal">Введенные вами данные содержат следующие ошибки:</p>
              <div className="descErrors">
                <img src={x} alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur.</p>
              </div>
              <div className="descErrors">
                <img src={x} alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
              </div>
            </div>
            <div className="function-group mb-3">
              <div className="actionsSuccessDeletedModal">
                <button className="btn" id="apply" style={{ fontSize: '13px' }}
                  onClick={() => setIsOpenModalNotSuccesDeleted(false)}>Назад</button>
                <button className="btn" id="discharge" style={{ fontSize: '13px' }}>Еще раз</button>
              </div>
            </div>
          </Modal>
        ) : null
      }

      {
        isOpenModalSelectedMoreThanOne ? (
          <Modal size="medium" center="center"
            close={() => setIsOpenModalSelectedMoreThanOne(false)}>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <img src={notSuccessDeletedLogo} alt="" />
            </div> <br />
            <p className="text2SuccessDeletedModal">Ошибка</p>
            <p className="text1Modal">Можно выбрать только один ползователь</p> <br />
            <div className="function-group mb-3">
              <div className="actionsSuccessDeletedModal">
                <button className="btn" id="apply" style={{ fontSize: '13px' }}
                  onClick={() => setIsOpenModalSelectedMoreThanOne(false)}>Назад</button>
                <button className="btn" id="discharge" style={{ fontSize: '13px' }}
                  onClick={() => setIsOpenModalSelectedMoreThanOne(false)}>Еще раз</button>
              </div>
            </div>
          </Modal>
        ) : null
      }

      {
        isOpenModalDoneOperation ? (
          <Modal size="medium" center="center"
            close={() => setIsOpenModalDoneOperation(false)}>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <img style={{ height: '70px' }} src={alert1} alt="" />
            </div> <br />
            <p className="text2SuccessDeletedModal">Ваша операция была выполнена</p>
            <div className="function-group mb-3">
              <div style={{ maxWidth: '100%', marginLeft: '285px' }}>
                <button className="btn" id="apply" style={{ fontSize: '13px' }}
                  onClick={() => setIsOpenModalDoneOperation(false)}>Назад</button>
              </div>
            </div>
          </Modal>
        ) : null
      }

      {
        isOpenModalSomeProblemOperation ? (
          <Modal size="medium" center="center"
            close={() => setIsOpenModalSomeProblemOperation(false)}>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <img style={{ height: '70px' }} src={warning} alt="" />
            </div> <br /> <br />
            <p className="text1WarningModal">Возникли проблемы с вашей операцией.</p>
            <p className="text2WarningModal">
              Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.
            </p> <br />
            <div className="function-group mb-3">
              <div style={{ maxWidth: '100%', marginLeft: '285px' }}>
                <button className="btn" id="apply" style={{ fontSize: '13px' }}
                  onClick={() => setIsOpenModalSomeProblemOperation(false)}>
                  Назад
                </button>
              </div>
            </div>
          </Modal>
        ) : null
      }

      {
        isOpenModalRefactoringUser ? (
          <Modal size="medium" center="center"
            close={() => {
              setIsOpenModalRefactoringUser(false);
              props.history.push('/userTable');
            }}
            style={{ padding: '0px' }}>
            {console.log(isSelectedUser, "<<rrr")}
            <CreateUser isRefactoring={true} userDto={isSelectedUser} closeModalRefactoring={closeModalRefactoring} />
          </Modal>
        ) : null
      }
    </>
  );
}

export default withRouter(UserTable);

