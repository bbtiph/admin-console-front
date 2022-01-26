/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/*****************************************************************************/

export default function ReportByContract() {
  return (
    <>
      <div className="table-box">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">№ Договора</th>
              <th scope="col">Наименование услуги</th>
              <th scope="col">Количество договоров</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="#">0000220</a></td>
              <td><a href="#">123</a></td>
              <td>123</td>
              <td>123</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}


