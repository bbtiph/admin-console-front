/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/*****************************************************************************/

export default function ReportByDownloadingApp(props) {
  return (
    <>
      <div className="table-box">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Наименование услуги</th>
              <th scope="col">Январь</th>
              <th scope="col">Февраль</th>
              <th scope="col">Март</th>
              <th scope="col">Апрель</th>
              <th scope="col">Май</th>
              <th scope="col">Июнь</th>
              <th scope="col">Июль</th>
              <th scope="col">Август</th>
              <th scope="col">Сентябрь</th>
              <th scope="col">Октябрь</th>
              <th scope="col">Ноябрь</th>
              <th scope="col">Декабрь</th>
            </tr>
          </thead>
          <tbody>
          {
            props.reportList.length > 0 ? props.reportList.map((col, u) => (
              <tr>
                <td>
                  {u + 1}
                </td>
                <td>
                  <a href="#">{col.name}</a>
                </td>
                {
                  col.monthCount && col.monthCount.length > 0 ? (
                    col.monthCount.map(c => (
                      <td>{c}</td>
                    ))
                  ) : (
                    <>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </>
                  )
                }
              </tr>
              )
            ) : <></>
          }
          </tbody>
        </table>
      </div>
    </>
  );
}


