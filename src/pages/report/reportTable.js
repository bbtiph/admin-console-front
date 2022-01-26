/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import swal from "sweetalert2";

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/userTable.css';
import "../style/serviceTable.css";

/* Images */
import reload from '../../assets/icons/reload.svg';

/* Components */
import Component from "../../components/Component";
import Search from "../../components/search/Search";
import Filter from "../../components/search/Filter";
import ReportByUsers from "../../components/reportTables/reportByUsers";
import ReportByTransaction from "../../components/reportTables/reportByTransaction";
import ReportByContract from "../../components/reportTables/reportByContract";
import ReportByDownloadingApp from "../../components/reportTables/reportByDownloadingApp";

/* Reducers */
import { setReport } from "../../Redux/reportTableReducer";

/*****************************************************************************/

export default function ReportTable(props) {
  const [isFilterForReport, setIsFilterForReport] = useState({isStartDate: "", isEndDate: "", isField: 2});
  const [isRes, setIsRes] = useState(null);

  // let linkToExcel = "https://test.post.kz/admin-console-app/crm-server/api/export-by-okt/excel/"
  let linkToExcel = "https://localhost/admin-console-app/crm-server/api/export-by-okt/excel/"
  try {
    linkToExcel += isFilterForReport.isStartDate.substring(0, 4)
  } catch (e) {
    console.log(e);
  }
  let pagesCount = Math.ceil(props.reportPage.totalCount / 10);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }


  const startReport = (props2) => {
    setIsFilterForReport(props2);
    props.onChangePage({ start: props2.isStartDate, end: props2.isEndDate, isField: props2.isField });
  }

  const exportToExcel = ({ params, fileName }) => {
    const config = {
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };

    let endpoint;
    switch (params.isField) {
      case 1:
        endpoint = '/admin-console-app/crm-server/api/get-report-by-users';
        break;
      case 2:
        endpoint = '/admin-console-app/crm-server/api/get-report-by-transaction';
        break;
      case 3:
        endpoint = '/export-by-okt/excel/2020';
        break;
      case 4:
        endpoint = '/';
        break;
    }
    const queryString = new URLSearchParams();
    queryString.set('start', params.start ?? "");
    queryString.set('end', params.end ?? "");
    queryString.set('isFullInf', true);

    axios.get(`${endpoint}?${queryString.toString()}`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          exportToCSV(res.data, fileName);
        } else {
          swal.fire(
            ('Ошибка'),
            ('Ваш токен не валидный.'),
            'error',
          );
        }
      }
    );
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(apiData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };

  };

  return (
    <>
      <Component />
      <div className="page-wrapper">
        <div className="pageHeader">
          <label> Главная / <span>Отчетность</span></label>
          <h5>Отчетность</h5>
        </div>

        <Filter fields={[
          "Отчет по пользователям",
          "Выгрузка статических данных"]} startReport={startReport} />

        <div className="serviceTable">
          <div className="upperTableToDo">
            <h5>Результаты поиска</h5>
            <div className="toDoButton">
              {
                isFilterForReport.isField != 3 ? (
                  <button className="btn btn-primary" onClick={() => exportToExcel({
                    params: {
                      start: isFilterForReport.isStartDate, end: isFilterForReport.isEndDate, isField: isFilterForReport.isField
                    }, fileName:
                      isFilterForReport.isField == 3 ? "Выгрузка статических данных" :
                        isFilterForReport.isField == 1 ? "Отчет по пользователям" : "Отчет"
                  })}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.6026 3.75754L9.24014 0.395044C9.14639 0.301294 9.01982 0.248169 8.88701 0.248169H2.24951C1.97295 0.248169 1.74951 0.471606 1.74951 0.748169V13.7482C1.74951 14.0247 1.97295 14.2482 2.24951 14.2482H12.2495C12.5261 14.2482 12.7495 14.0247 12.7495 13.7482V4.11223C12.7495 3.97942 12.6964 3.85129 12.6026 3.75754ZM11.5964 4.34192H8.65576V1.40129L11.5964 4.34192ZM11.6245 13.1232H2.87451V1.37317H7.59326V4.74817C7.59326 4.92222 7.6624 5.08914 7.78547 5.21221C7.90854 5.33528 8.07546 5.40442 8.24951 5.40442H11.6245V13.1232ZM7.28232 8.31223L6.3167 6.71223C6.28232 6.65598 6.22139 6.62161 6.15576 6.62161H5.55576C5.51982 6.62161 5.48545 6.63098 5.45576 6.65129C5.36826 6.70598 5.3417 6.82161 5.39795 6.91067L6.68389 8.94817L5.38076 11.0232C5.36306 11.0516 5.35328 11.0843 5.35243 11.1178C5.35159 11.1513 5.35971 11.1844 5.37596 11.2138C5.39221 11.2431 5.416 11.2675 5.44486 11.2845C5.47373 11.3016 5.50662 11.3106 5.54014 11.3107H6.0792C6.14482 11.3107 6.2042 11.2763 6.23857 11.2216L7.21826 9.63567L8.1917 11.22C8.22607 11.2763 8.28701 11.3091 8.35108 11.3091H8.93701C8.97295 11.3091 9.00733 11.2982 9.03858 11.2794C9.12608 11.2232 9.15107 11.1075 9.09482 11.02L7.78232 8.98254L9.11514 6.91223C9.13318 6.88386 9.14329 6.85116 9.14441 6.81756C9.14553 6.78395 9.13762 6.75066 9.12151 6.72115C9.10539 6.69163 9.08166 6.66698 9.05279 6.64974C9.02391 6.63251 8.99095 6.62334 8.95732 6.62317H8.39951C8.33389 6.62317 8.27295 6.65754 8.23857 6.71379L7.28232 8.31223Z"
                        fill="white" />
                    </svg>
                    Выгрузить в Excel</button>
                ) : (
                  <a className="btn btn-primary" href={linkToExcel}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.6026 3.75754L9.24014 0.395044C9.14639 0.301294 9.01982 0.248169 8.88701 0.248169H2.24951C1.97295 0.248169 1.74951 0.471606 1.74951 0.748169V13.7482C1.74951 14.0247 1.97295 14.2482 2.24951 14.2482H12.2495C12.5261 14.2482 12.7495 14.0247 12.7495 13.7482V4.11223C12.7495 3.97942 12.6964 3.85129 12.6026 3.75754ZM11.5964 4.34192H8.65576V1.40129L11.5964 4.34192ZM11.6245 13.1232H2.87451V1.37317H7.59326V4.74817C7.59326 4.92222 7.6624 5.08914 7.78547 5.21221C7.90854 5.33528 8.07546 5.40442 8.24951 5.40442H11.6245V13.1232ZM7.28232 8.31223L6.3167 6.71223C6.28232 6.65598 6.22139 6.62161 6.15576 6.62161H5.55576C5.51982 6.62161 5.48545 6.63098 5.45576 6.65129C5.36826 6.70598 5.3417 6.82161 5.39795 6.91067L6.68389 8.94817L5.38076 11.0232C5.36306 11.0516 5.35328 11.0843 5.35243 11.1178C5.35159 11.1513 5.35971 11.1844 5.37596 11.2138C5.39221 11.2431 5.416 11.2675 5.44486 11.2845C5.47373 11.3016 5.50662 11.3106 5.54014 11.3107H6.0792C6.14482 11.3107 6.2042 11.2763 6.23857 11.2216L7.21826 9.63567L8.1917 11.22C8.22607 11.2763 8.28701 11.3091 8.35108 11.3091H8.93701C8.97295 11.3091 9.00733 11.2982 9.03858 11.2794C9.12608 11.2232 9.15107 11.1075 9.09482 11.02L7.78232 8.98254L9.11514 6.91223C9.13318 6.88386 9.14329 6.85116 9.14441 6.81756C9.14553 6.78395 9.13762 6.75066 9.12151 6.72115C9.10539 6.69163 9.08166 6.66698 9.05279 6.64974C9.02391 6.63251 8.99095 6.62334 8.95732 6.62317H8.39951C8.33389 6.62317 8.27295 6.65754 8.23857 6.71379L7.28232 8.31223Z"
                        fill="white" />
                    </svg>
                    Выгрузить в Excell</a>
                )
              }
            </div>
          </div>
          {/*{isFilterForReport != null ? isFilterForReport.isField == 3 ? <ReportByDownloadingApp reportList={props.reportPage.reportList}/> :*/}
          {/*  isFilterForReport.isField == 2 ? <ReportByTransaction reportList={props.reportPage.reportList} />  :*/}
          {/*    <ReportByUsers reportList={props.reportPage.reportList} /> :*/}
          {/*      <ReportByTransaction reportList={props.reportPage.reportList} />}*/}
          <ReportByTransaction reportList={props.reportPage.reportList} />

          { isFilterForReport.isField != 3 ? (
            <div className="pagination-box container-fluid">
            <nav>
              <ul className="pagination justify-content-end">
                <li className="page-counter"><a className="page-link">
                  {!props.reportPage.currentPage ? props.reportPage.currentPage = 1 : null}
                  {(props.reportPage.currentPage - 1) * 10 + 1}-{(props.reportPage.currentPage) * 10} их {pagesCount} страниц</a>
                </li>
                <li onClick={() => {
                  props.onChangePage({
                    isField: isFilterForReport.isField,
                    pageNumber: props.reportPage.currentPage - (props.reportPage.currentPage - 1 >= 1 ? 1 : 0),
                    start: isFilterForReport.isStartDate,
                    end: isFilterForReport.isEndDate
                  })
                }} className="page-item">
                  <a className="page-link " aria-label="Previous">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.83959 2.06667V1.0314C6.83959 0.941669 6.73646 0.892116 6.66682 0.947026L0.629321 5.66265C0.578024 5.70254 0.536516 5.75362 0.507964 5.812C0.479411 5.87037 0.464569 5.9345 0.464569 5.99948C0.464569 6.06446 0.479411 6.12859 0.507964 6.18696C0.536516 6.24534 0.578024 6.29642 0.629321 6.33631L6.66682 11.0519C6.7378 11.1068 6.83959 11.0573 6.83959 10.9676V9.93229C6.83959 9.86667 6.80879 9.80372 6.75789 9.76354L1.93646 6.00015L6.75789 2.23542C6.80879 2.19524 6.83959 2.13229 6.83959 2.06667Z"
                        fill="#D9D9D9"/>
                    </svg>
                  </a>
                </li>
                {
                  pages.slice(props.reportPage.currentPage - 1, props.reportPage.currentPage + 5).map((page) => {
                      return (

                        <li onClick={() => {
                          props.onChangePage({
                            isField: isFilterForReport.isField,
                            pageNumber: page,
                            start: isFilterForReport.isStartDate,
                            end: isFilterForReport.isEndDate
                          })
                        }} className="page-item">
                          <a className="page-link">
                            <p className={props.reportPage.currentPage === page ? "selected" : ""}>
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
                      fill="black" fill-opacity="0.25"/>
                  </svg>
                </a></li>

                {pagesCount > 10 ?
                  pages.slice(pagesCount - 6, pagesCount - 1).map((page) => {
                      return (
                        <li onClick={() => {
                          props.onChangePage({
                            isField: isFilterForReport.isField,
                            pageNumber: page,
                            start: isFilterForReport.isStartDate,
                            end: isFilterForReport.isEndDate
                          })
                        }} className="page-item">
                          <a className="page-link">
                            <p
                              className={props.reportPage.currentPage === page ? "selected" : ""}>
                              {page}
                            </p>
                          </a>
                        </li>
                      )
                    }
                  ) : null
                }

                <li onClick={() => {
                  props.onChangePage({
                    isField: isFilterForReport.isField,
                    pageNumber: props.reportPage.currentPage + (props.reportPage.currentPage + 1 <= pagesCount ? 1 : 0),
                    start: isFilterForReport.isStartDate,
                    end: isFilterForReport.isEndDate
                  })
                }} className="page-item">
                  <a className="page-link" aria-label="Next">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.39777 5.66323L0.360269 0.947601C0.344493 0.93518 0.325533 0.927462 0.305568 0.925331C0.285603 0.9232 0.265441 0.926744 0.247399 0.935555C0.229357 0.944367 0.214166 0.958088 0.203571 0.975144C0.192976 0.992199 0.187406 1.0119 0.187501 1.03198V2.06724C0.187501 2.13287 0.218305 2.19581 0.269198 2.23599L5.09063 6.00073L0.269198 9.76546C0.216966 9.80564 0.187501 9.86858 0.187501 9.93421V10.9695C0.187501 11.0592 0.290626 11.1088 0.360269 11.0539L6.39777 6.33823C6.44908 6.2982 6.4906 6.247 6.51915 6.18851C6.5477 6.13003 6.56254 6.06581 6.56254 6.00073C6.56254 5.93565 6.5477 5.87142 6.51915 5.81294C6.4906 5.75446 6.44908 5.70325 6.39777 5.66323Z"
                        fill="black" fill-opacity="0.85"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>) : <></>}

        </div>
      </div>
    </>
  );
}


