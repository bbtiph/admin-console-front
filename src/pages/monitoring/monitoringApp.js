/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import { Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Components */
import Component from "../../components/Component";

/* Styles */
import '../style/userTable.css';
import "../style/serviceTable.css";
import "../style/monitoring.css";

/*****************************************************************************/

export default function MonitoringApplication() {
  return (
    <>
      <Component />
      <div className="page-wrapper">
        <div className="pageHeaderMonitoring">
          <label> Главная / <span>Мониторинг</span></label>
          <h5>Мониторинг</h5>
          <div className="monitoringMenu">
            <div className="row">
              <div className="col">
                {/*<MonitoringHeader/>*/}
              </div>
              <div className="col" />
            </div>
          </div>
        </div>


        <div className="serviceTable">
          <div className="upperTableToDo">
            <h5>Приложения и сервисы</h5>

          </div>

          <div className="table-box">
            <table className="table">
              <thead>
                <tr>

                  <th scope="col">Приложение/сервис</th>
                  <th scope="col">Статус активности</th>
                  <th scope="col">Производительность</th>
                  <th scope="col">Сбой</th>
                  <th scope="col">Критичность</th>
                  <th scope="col">Причина сбоя</th>
                  <th scope="col">Время сбоя</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="#">Наименование</a></td>
                  <td>Активен</td>
                  <td>0001 мс</td>
                  <td>
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect y="0.998779" width="6.0015" height="6.0025" rx="3.00075" fill="#FF4D4F" />
                    </svg>
                    Error
                  </td>
                  <td>
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect y="0.998779" width="6.0015" height="6.0025" rx="3.00075" fill="#FF4D4F" />
                    </svg>
                  </td>
                  <td>Order number: 2017182818828182881 Cloud server</td>
                  <td>2021-02-05 08:28:36</td>
                </tr>
                <tr>
                  <td><a href="#">Наименование</a></td>
                  <td>Активен</td>
                  <td>0001 мс</td>
                  <td>
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect y="0.998779" width="6.0015" height="6.0025" rx="3.00075" fill="#1890FF" />
                    </svg>
                    Error
                  </td>
                  <td>
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect y="0.998779" width="6.0015" height="6.0025" rx="3.00075" fill="#FFD54F" />
                    </svg>
                  </td>
                  <td>Order number: 2017182818828182881 Cloud server</td>
                  <td>2021-02-05 08:28:36</td>
                </tr>
                <tr>
                  <td><a href="#">Наименование</a></td>
                  <td>Активен</td>
                  <td>0001 мс</td>
                  <td>
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect y="0.998779" width="6.0015" height="6.0025" rx="3.00075" fill="#FF4D4F" />
                    </svg>
                    Error
                  </td>
                  <td>
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect y="0.998779" width="6.0015" height="6.0025" rx="3.00075" fill="#FF4D4F" />
                    </svg>
                  </td>
                  <td>Order number: 2017182818828182881 Cloud server</td>
                  <td>2021-02-05 08:28:36</td>
                </tr>


              </tbody>
            </table>
          </div>

          <div className="pagination-box container-fluid">
            <nav>
              <ul className="pagination justify-content-end">
                <li className="page-counter"><a className="page-link">1-10 их 100 страниц</a></li>
                <li className="page-item">
                  <a className="page-link " href="#" aria-label="Previous">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.83959 2.06667V1.0314C6.83959 0.941669 6.73646 0.892116 6.66682 0.947026L0.629321 5.66265C0.578024 5.70254 0.536516 5.75362 0.507964 5.812C0.479411 5.87037 0.464569 5.9345 0.464569 5.99948C0.464569 6.06446 0.479411 6.12859 0.507964 6.18696C0.536516 6.24534 0.578024 6.29642 0.629321 6.33631L6.66682 11.0519C6.7378 11.1068 6.83959 11.0573 6.83959 10.9676V9.93229C6.83959 9.86667 6.80879 9.80372 6.75789 9.76354L1.93646 6.00015L6.75789 2.23542C6.80879 2.19524 6.83959 2.13229 6.83959 2.06667Z"
                        fill="#D9D9D9" />
                    </svg>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-skipper"><a className="page-link">
                  <svg width="19" height="4" viewBox="0 0 19 4" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.882812 2.09222C0.882812 1.61371 1.05143 1.20583 1.38867 0.868591C1.73047 0.531352 2.13835 0.362732 2.6123 0.362732C3.09082 0.362732 3.4987 0.531352 3.83594 0.868591C4.17773 1.20583 4.34863 1.61371 4.34863 2.09222C4.34863 2.57074 4.17773 2.9809 3.83594 3.32269C3.4987 3.65993 3.09082 3.82855 2.6123 3.82855C2.13835 3.82855 1.73047 3.65993 1.38867 3.32269C1.05143 2.9809 0.882812 2.57074 0.882812 2.09222ZM7.79102 2.09222C7.79102 1.61371 7.95964 1.20583 8.29688 0.868591C8.63867 0.531352 9.04655 0.362732 9.52051 0.362732C9.99902 0.362732 10.4069 0.531352 10.7441 0.868591C11.0859 1.20583 11.2568 1.61371 11.2568 2.09222C11.2568 2.57074 11.0859 2.9809 10.7441 3.32269C10.4069 3.65993 9.99902 3.82855 9.52051 3.82855C9.04655 3.82855 8.63867 3.65993 8.29688 3.32269C7.95964 2.9809 7.79102 2.57074 7.79102 2.09222ZM14.6992 2.09222C14.6992 1.61371 14.8678 1.20583 15.2051 0.868591C15.5469 0.531352 15.9548 0.362732 16.4287 0.362732C16.9072 0.362732 17.3151 0.531352 17.6523 0.868591C17.9941 1.20583 18.165 1.61371 18.165 2.09222C18.165 2.57074 17.9941 2.9809 17.6523 3.32269C17.3151 3.65993 16.9072 3.82855 16.4287 3.82855C15.9548 3.82855 15.5469 3.65993 15.2051 3.32269C14.8678 2.9809 14.6992 2.57074 14.6992 2.09222Z"
                      fill="black" fill-opacity="0.25" />
                  </svg>
                </a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
                <li className="page-item"><a className="page-link" href="#">6</a></li>
                <li className="page-item"><a className="page-link" href="#">7</a></li>
                <li className="page-item"><a className="page-link" href="#">8</a></li>
                <li className="page-skipper"><a className="page-link">
                  <svg width="19" height="4" viewBox="0 0 19 4" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.882812 2.09222C0.882812 1.61371 1.05143 1.20583 1.38867 0.868591C1.73047 0.531352 2.13835 0.362732 2.6123 0.362732C3.09082 0.362732 3.4987 0.531352 3.83594 0.868591C4.17773 1.20583 4.34863 1.61371 4.34863 2.09222C4.34863 2.57074 4.17773 2.9809 3.83594 3.32269C3.4987 3.65993 3.09082 3.82855 2.6123 3.82855C2.13835 3.82855 1.73047 3.65993 1.38867 3.32269C1.05143 2.9809 0.882812 2.57074 0.882812 2.09222ZM7.79102 2.09222C7.79102 1.61371 7.95964 1.20583 8.29688 0.868591C8.63867 0.531352 9.04655 0.362732 9.52051 0.362732C9.99902 0.362732 10.4069 0.531352 10.7441 0.868591C11.0859 1.20583 11.2568 1.61371 11.2568 2.09222C11.2568 2.57074 11.0859 2.9809 10.7441 3.32269C10.4069 3.65993 9.99902 3.82855 9.52051 3.82855C9.04655 3.82855 8.63867 3.65993 8.29688 3.32269C7.95964 2.9809 7.79102 2.57074 7.79102 2.09222ZM14.6992 2.09222C14.6992 1.61371 14.8678 1.20583 15.2051 0.868591C15.5469 0.531352 15.9548 0.362732 16.4287 0.362732C16.9072 0.362732 17.3151 0.531352 17.6523 0.868591C17.9941 1.20583 18.165 1.61371 18.165 2.09222C18.165 2.57074 17.9941 2.9809 17.6523 3.32269C17.3151 3.65993 16.9072 3.82855 16.4287 3.82855C15.9548 3.82855 15.5469 3.65993 15.2051 3.32269C14.8678 2.9809 14.6992 2.57074 14.6992 2.09222Z"
                      fill="black" fill-opacity="0.25" />
                  </svg>
                </a></li>
                <li className="page-item"><a className="page-link" href="#">50</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
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
    </>
  );
}


