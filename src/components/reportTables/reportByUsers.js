/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/*****************************************************************************/

export default function ReportByUsers(props) {
  return (
    <>
      <div className="table-box">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">ФИО</th>
              <th scope="col">ИИН</th>
              <th scope="col">Номер телефона</th>
              <th scope="col">Последняя авторизация</th>
            </tr>
          </thead>
          <tbody>
            {
              props.reportList.map((col, i) => (
                <tr>
                  <td><a href="#">{col.id}</a></td>
                  <td>{col.firstName + " " + col.lastName + " " + col.middleName}</td>
                  <td>{col.iin ? col.iin : '-'}</td>
                  <td>{col.mobileNumber ? col.mobileNumber : '-'}</td>
                  <td>12.01.2019</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}


