/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from "sweetalert2";

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/search.css';

/* Components */
import Modal from "../../Common/Modal/modal";

/* Images */
import vectorRight from "./../../assets/icons/icons-hover/vectorRight.svg";

/*****************************************************************************/

function Filter(props2) {

  const [isOpenModalSetParam, setIsOpenModalSetParam] = useState(false);
  const [isStartDate, setIsStartDate] = useState(null);
  const [isEndDate, setIsEndDate] = useState(null);


  const options = [];

  let isField = 1;

  props2.fields.map((field, i) => {
    let option = { value: i, label: field };
    options.push(option);
  })

  return (
    <div className="container-fluid" id="search-box">
      <form>
          {
            isField == 1 ? (
              <div className="input-group mb-3">
                <input type="date" style={{ width: '40px' }}
                       className="form-control" id="exampleFormControlInput1"
                       onChange={(event) => {
                         setIsStartDate(event.target.value);
                       }}
                />
                <img src={vectorRight} style={{ marginRight: '10px', marginLeft: '10px', width: '20px' }} />
                <input type="date"
                       className="form-control" id="exampleFormControlInput1"
                       onChange={(event) => {
                         setIsEndDate(event.target.value)
                       }}
                />
              </div>
            ) : isField == 3 ? (
              <div className="input-group mb-3">
                <input type="date" style={{ width: '40px' }}
                       className="form-control" id="exampleFormControlInput1"
                       onChange={(event) => {
                         setIsStartDate(event.target.value);
                       }}
                />
              </div>
            ) : (<div></div>)
          }
        <div className="function-group mb-3">
          <div className="searchActions">
            <button type="button" className="btn" style={{ width: '200px' }} id="apply" onClick={() => {
              if (isStartDate && isEndDate) {
                props2.startReport({ isStartDate: isStartDate, isEndDate: isEndDate, isField: isField });
              } else {
                swal.fire(
                  'Внимание',
                  'Пожалуйста, заполните все поля формы и нажмите кнопку «Запустить отчет»',
                  'warning',
                );
              }

            }}>
              Запустить отчет
            </button>
            <select className="form-control" id="userRoles" style={{ width: '200px' }} onChange={(e) => {
              switch (e.target.value) {
                case "Отчет по пользователям":
                  isField = 1
                  break;
                case "Выгрузка статических данных":
                  isField = 3
                  break;
                // case "Отчет по договорам ЮЛ":
                //   isField = 3
                //   break;
                // case "Отчет по скачиванию мобильного приложения":
                //   isField = 4
                //   break;
              }
            }}>
              {
                options.map((option, i) => (
                  <option>
                    {option.label}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
      </form>
      {
        isOpenModalSetParam ? (
          <Modal size="small" center="center" close={() => {
            setIsOpenModalSetParam(false);
          }}
            style={{ padding: '0px' }} title="Settings">
            <select className="form-control" id="userRoles">
              {
                options.map((option, i) => (
                  <option>
                    {option.label}
                  </option>
                ))
              }
            </select>
          </Modal>) : null
      }
    </div>
  )
}

export default Filter;
