/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import swal from "sweetalert2";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

/*****************************************************************************/

export default function ReportByTransaction(props) {

  let endpoint = 'https://test.post.kz/admin-console-app/crm-server/api/download-excel-report-by-link';
  // let endpoint = 'http://localhost:8888/admin-console-app/crm-server/api/download-excel-report-by-link';
  const exportToExcel = (col) => {
    const config = {
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };

    let endpoint = '/admin-console-app/crm-server/api/download-excel-report-by-link';

    const queryString = new URLSearchParams();
    queryString.set('id', col.id);

    axios.get(`${endpoint}?${queryString.toString()}`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          exportToCSV(res.data, col.nameOfTransaction);
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
      <div className="table-box">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Наименование отчета</th>
              <th scope="col">Дата запуска</th>
              <th scope="col">Ссылка на выгрузку в Excell</th>
            </tr>
          </thead>
          <tbody>
            {
              props.reportList.map((col, i) => (
                <tr key={i}>
                  <td><a style={{color: '#4184ce'}}>{col.nameOfTransaction}</a></td>
                  <td>{col.transactionDate ? col.transactionDate.slice(0, 10) : '-'}</td>
                  <td><a href={endpoint + '/' + col.id} style={{color: '#4184ce'}}>{col.linkOfExcel}</a></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}


