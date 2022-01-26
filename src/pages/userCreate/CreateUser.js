import React, {useEffect, useState} from "react";
import {Link, withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import swal from "sweetalert2";
import {logDOM} from "@testing-library/react";
import './createUser.css';

/* Components */
import PageHeaderUser from "./PageHeaderUser";
import Component from "../../components/Component";
import Modal from "../../Common/Modal/modal";

/* Images */
import successDeletedLogo from '../../assets/icons/succesDeleted.svg';
import notSuccessDeletedLogo from '../../assets/icons/notSuccessDeleted.svg';

function CreateUser(props) {
  const [isIin, setIsIin] = useState(null);
  const [isFullName, setIsFullName] = useState(null);
  const [isBirthDay, setIsBirthDay] = useState(null);
  const [isPhoneNumber, setIsPhoneNumber] = useState(null);
  const [isEmail, setIsEmail] = useState(null);
  const [isRole, setRole] = useState(null);
  const [isPassword, setIsPassword] = useState(null);

  const [isOpenModalSuccessSaved, setIsOpenModalSuccessSaved] = useState(false);

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {

    if (props.isRefactoring) {
      setIsIin(props.userDto.iin);
      setIsFullName(props.userDto.firstName + " " + props.userDto.lastName + " " + props.userDto.middleName);
      if (props.userDto.birthDate) setIsBirthDay(props.userDto.birthDate.slice(0, 10));
      setIsEmail(props.userDto.email);
      setIsPhoneNumber(props.userDto.mobileNumber);
    }
  }, []);

  const isRoleChanged = (e) => {
    debugger
    console.log('eee', e);
    setRole(e)
  }

  const isIinChanged = (iin) => {
    setIsIin(iin);
    if (iin.length == 12) {
      const config = {
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`}
      };
      getFioByIin(config, iin);
    }
  }

  const getFioByIin = async (config, iin) => {
    const endpoint = '/admin-console-app/crm-server/api/getUserFioByIin';

    const queryString = new URLSearchParams();
    queryString.set('iin', iin);
    await axios.get(`${endpoint}?${queryString.toString()}`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          setIsFullName(res.data);
        } else {
          alert("invalid");
        }
      }
    );
  }

  let role = React.createRef();

  let addUser = (param) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    var emailValid = emailRegex.test(isEmail);
    var roleValid = localStorage.getItem('roles').includes("ROLE_ADMINS");
    if (emailValid && roleValid) {
      const config = {
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`}
      };
      let data = {
        fullName: isFullName,
        login: isIin,
        mobileNumber: isPhoneNumber,
        password: isPassword,
        birthDate: isBirthDay,
        userRole: isRole != null ? isRole : "ROLE_USER",
        email: isEmail
      }
      debugger
      console.log(data, '<<tttt');
      debugger
      if (param) {
        axios.post(`/admin-console-app/crm-server/api/createUser`, data, config).then(
          res => {
            if (res.status >= 200 && res.status <= 299) {
              setIsDone(true);
              // props.closeModalRefactoring();
              swal.fire(('Успешно'), '', 'success');

              props.history.push('/userTable');
            } else {
              swal.fire(('Ошибка'), '', 'error');
            }
          }
        ).catch(err => {
            swal.fire(('Ошибка'), 'Пользователь с таким логином/ИИН уже зарегистрирован.', 'error');
          }
        );
      } else {
        axios.post(`/admin-console-app/crm-server/api/refactoringUser`, data, config).then(
          res2 => {
            if (res2.status >= 200 && res2.status <= 299) {
              setIsDone(true);
              swal.fire(('Успешно'), 'Пользователь успешно изменен', 'success');

              props.history.push('/');
              props.history.replace('/userTable');
            } else {
              swal.fire(('Ошибка'), '', 'error');
            }
          }
        );

      }
    } else {
      if (!roleValid) {
        swal.fire(
          ('Ошибка'),
          ('Вы не можете изменить пользователь.'),
          'warning',
        );
      } else if (param) {
        if (isPassword.length > 8) {
          swal.fire(
            ('Ошибка'),
            ('Пароль не соответствует требованиям'),
            'warning',
          );
        }
      } else if (!emailValid) {
        swal.fire(
          ('Ошибка'),
          ('Ваш электронный адрес не правильный'),
          'warning',
        );
      }
    }
  }

  return (
    <>
      <Component/>
      <div className={props.isRefactoring ? "" : "page-wrapper"}>
        {props.isRefactoring ? <PageHeaderUser isRefactoring={true}/> : <PageHeaderUser isRefactoring={false}/>}
        <div className="container-fluid" id="create-user-form">
          <div className="saveUser">
            <div className="d-flex">
              <div className="mr-auto p-2"><h5>Данные о пользователе</h5></div>
              {
                !props.isRefactoring ? <div className="p-2">
                  <button style={{border: 'none'}} onClick={() => {
                    console.log(isBirthDay, ' <<tyt')
                    addUser(true)
                  }}>Сохранить
                  </button>
                </div> : <div className="p-2">
                  <button style={{border: 'none'}} onClick={() => {
                    console.log(isBirthDay, ' <<tyt')
                    addUser(false)
                  }}>Изменить
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="createUserForm">
            <form action="">
              <div className="row">
                <div className="col">
                  <label htmlFor="exampleFormControlInput1" className="form-label">ИИН</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" value={isIin}
                         onChange={(event) => {
                           isIinChanged(event.target.value);
                         }}/>
                </div>
                <div className="col">
                  <label htmlFor="exampleFormControlInput1" className="form-label">ФИО</label>
                  <input type="text" className="form-control" id="exampleFormControlInput11" value={isFullName}
                         onChange={(event) => setIsFullName(event.target.value)}/>
                </div>
                <div className="col">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Дата
                    рождения</label>
                  {/*<input type="text" className="form-control" id="exampleFormControlInput1" value={isBirthDay}*/}
                  {/*       onChange={(event) => setIsBirthDay(event.target.value)}>*/}
                  {/*</input>*/}
                  <input type="date" id="start" name="trip-start"
                         className="form-control" id="exampleFormControlInput1"
                         value={isBirthDay}
                         onChange={(event) => {
                           setIsBirthDay(event.target.value)
                         }}/>
                </div>

                {!props.isRefactoring ? <div className="col">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Пароль</label>
                  <input type="password" className="form-control"
                         onChange={(event) => setIsPassword(event.target.value)}/>
                </div> : null}
              </div>

            </form>
          </div>
          <div className="createUserForm">
            <form action="">
              <div className="row">
                <div className="col">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Номер
                    телефона</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" value={isPhoneNumber}
                         onChange={(event) => setIsPhoneNumber(event.target.value)}/>
                </div>
                <div className="col">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Электронный
                    адрес</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1" value={isEmail}
                         onChange={(event) => {
                           console.log(isEmail, "dd")
                           setIsEmail(event.target.value)
                         }}/>
                </div>
                <div className="col">

                  <label htmlFor="userRoles" className="form-label">Роль пользователя</label>
                  <select className="form-control" id="userRoless" onChange={(e) => {
                    isRoleChanged(e.target.value)
                  }}>
                    <option>
                      ROLE_USER
                    </option>
                    <option>
                      ROLE_ADMIN
                    </option>
                    <option>
                      ROLE_MANAGER
                    </option>
                    <option>
                      ROLE_ORGANIZATION
                    </option>
                    <option>
                      ROLE_EMPLOYEE
                    </option>
                    <option>
                      ROLE_ORGANIZATION_MODERATOR
                    </option>
                    <option>
                      ROLE_OPERATOR_KAZPOST
                    </option>
                  </select>
                  {/*<select className="form-control" id="userRoles" onChange={(e) => isRoleChanged(e)}>*/}
                  {/*  <option key={8} value={1} onClick={() => {*/}
                  {/*    console.log('eeee');*/}
                  {/*    isRoleChanged("ROLE_USER");*/}
                  {/*  }}>ROLE_USER*/}
                  {/*  </option>*/}
                  {/*<option key={1} value={2} onChange={() => {*/}
                  {/*  isRoleChanged("ROLE_ADMIN")*/}
                  {/*}}>ROLE_ADMIN*/}
                  {/*</option>*/}
                  {/*<option key={2} value={3} onSelect={() => {*/}
                  {/*  isRoleChanged("ROLE_MANAGER")*/}
                  {/*}}>*/}
                  {/*  ROLE_MANAGER*/}
                  {/*</option>*/}
                  {/*<option key={4} value={"234"} onClick={event => {*/}
                  {/*  isRoleChanged("ROLE_ORGANIZATION")*/}
                  {/*}}>*/}
                  {/*  ROLE_ORGANIZATIONs*/}
                  {/*</option>*/}
                  {/*<option key={5} onClick={event => {*/}
                  {/*  isRoleChanged("ROLE_EMPLOYEE")*/}
                  {/*}}>*/}
                  {/*  ROLE_EMPLOYEE*/}
                  {/*</option>*/}
                  {/*<option key={6} onClick={event => {*/}
                  {/*  isRoleChanged("ROLE_ORGANIZATION_MODERATOR")*/}
                  {/*}}>*/}
                  {/*  ROLE_ORGANIZATION_MODERATOR*/}
                  {/*</option>*/}
                  {/*<option key={7}*/}
                  {/*        onClick={event => {*/}
                  {/*          isRoleChanged("ROLE_OPERATOR_KAZPOST")*/}
                  {/*        }}>*/}
                  {/*  ROLE_OPERATOR_KAZPOST*/}
                  {/*</option>*/}
                  {/*</select>*/}
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
      {
        isOpenModalSuccessSaved ? (
          <Modal size="medium" center="center" close={() => setIsOpenModalSuccessSaved(false)}>
            <div style={{maxWidth: '100%', margin: '0 auto'}}>
              <img src={successDeletedLogo} alt=""/>
            </div>
            <br/><br/>
            <p className="text2SuccessDeletedModal">Учетная запись успешно создана!</p>
            <br/><br/>
            <div className="function-group mb-3">
              <div className="actionsSuccessDeletedModal2">
                <button className="btn" id="apply" style={{fontSize: '13px'}}
                        onClick={() => setIsOpenModalSuccessSaved(false)}>Назад
                </button>
              </div>
            </div>
          </Modal>
        ) : null
      }
    </>
  )
}

export default withRouter(CreateUser);
