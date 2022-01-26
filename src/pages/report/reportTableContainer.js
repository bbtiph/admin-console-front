/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React, { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert2";
import fs from 'fs';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Components */
import Preloader from "../../Common/Preloader/Preloader";
import ReportTable from "./reportTable";

/* Reducers */
import { setCurrentPage, toggleIsFetching, setTotalCountReportPage, setReport } from "../../Redux/reportTableReducer";
import { setUsers } from "../../Redux/userTableReducer";

/*****************************************************************************/

class ReportPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(1);

    const config = {
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    let endpoint1 = '/admin-console-app/crm-server/api/get-count-report-by-transaction';
    let endpoint = '/admin-console-app/crm-server/api/get-report-by-transaction';
    const queryString1 = new URLSearchParams();
    queryString1.set('start', "");
    queryString1.set('end', "");

    axios.get(`${endpoint1}?${queryString1.toString()}`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          this.props.toggleIsFetching(false)
          this.props.setTotalCountReportPage(res.data)
        } else {
          swal.fire(('Ошибка'), ('Ваш токен не валидный.'), 'error',
          );
        }
      }
    );

    const queryString = new URLSearchParams();
    queryString.set('page',  0);
    queryString.set('size', 10);
    queryString.set('start', "");
    queryString.set('end', "");

    axios.get(`${endpoint}?${queryString.toString()}`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          this.props.toggleIsFetching(false);
          this.props.setReport({ reportList: res.data, currentPage: 0 });
        }
        else {
          this.props.history.push('/reportTable');
        }
      }
    );
  }

  onChangePage = async (params) => {
    debugger
    const queryString = new URLSearchParams();
    queryString.set('type', params.isField);
    queryString.set('start', params.start ?? "");
    queryString.set('end', params.end ?? "");
    const config = {
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };

    let endpoint = '/admin-console-app/crm-server/api/start-report-history';
    await axios.get(`${endpoint}?${queryString.toString()}`, config).then(
            res => {
              if (res.status >= 200 && res.status <= 299) {

              } else {
                swal.fire(
                  ('Ошибка'),
                  ('Ваш токен не валидный.'),
                  'error',
                );
              }
            });
    await this.componentDidMount();


    // debugger
    //
    // this.props.toggleIsFetching(true);
    // this.props.setCurrentPage(params.pageNumber);
    //
    // const config = {
    //   headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    // };
    // let endpoint1;
    // let endpoint;
    // switch (params.isField) {
    //   case 1:
    //     endpoint1 = '/admin-console-app/crm-server/api/get-count-report-by-users';
    //     endpoint = '/admin-console-app/crm-server/api/get-report-by-users';
    //     break;
    //   case 2:
    //     endpoint1 = '/admin-console-app/crm-server/api/get-count-report-by-transaction';
    //     endpoint = '/admin-console-app/crm-server/api/get-report-by-transaction';
    //     break;
    //   case 3:
    //     debugger
    //     endpoint = '/admin-console-app/crm-server/api/get-report-by-okt/' + (params.start.substring(0, 4));
    //     await axios.get(`${endpoint}`, config).then(
    //       res => {
    //         if (res.status >= 200 && res.status <= 299) {
    //           this.props.toggleIsFetching(false);
    //           this.props.setReport({reportList: res.data, currentPage: 0});
    //         } else {
    //           swal.fire(
    //             ('Ошибка'),
    //             ('Ваш токен не валидный.'),
    //             'error',
    //           );
    //         }
    //       }
    //     );
    //
    //     break;
    //   case 4:
    //     endpoint1 = '/';
    //     break;
    // }
    // debugger
    // if (params.isField != 3) {
    //   debugger
    //   const queryString1 = new URLSearchParams();
    //   queryString1.set('start', params.start ?? "");
    //   queryString1.set('end', params.end ?? "");
    //
    //   axios.get(`${endpoint1}?${queryString1.toString()}`, config).then(
    //     res => {
    //       if (res.status >= 200 && res.status <= 299) {
    //         this.props.toggleIsFetching(false)
    //         this.props.setTotalCountReportPage(res.data)
    //       } else {
    //         swal.fire(
    //           ('Ошибка'),
    //           ('Ваш токен не валидный.'),
    //           'error',
    //         );
    //       }
    //     }
    //   );
    //
    //   const queryString = new URLSearchParams();
    //   queryString.set('page', params.pageNumber ? params.pageNumber - 1 : 0);
    //   queryString.set('size', 10);
    //   queryString.set('start', params.start ?? "");
    //   queryString.set('end', params.end ?? "");
    //
    //   axios.get(`${endpoint}?${queryString.toString()}`, config).then(
    //     res => {
    //       if (res.status >= 200 && res.status <= 299) {
    //         this.props.toggleIsFetching(false);
    //         this.props.setReport({reportList: res.data, currentPage: params.pageNumber});
    //       } else {
    //         this.props.history.push('/reportTable');
    //       }
    //     }
    //   );
    // }
  }

  render() {

    return (
      <>
        <div>
          <Preloader isFetching={this.props.reportPage.isFetching} />
          <ReportTable reportPage={this.props.reportPage} onChangePage={this.onChangePage} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reportPage: state.reportPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPage(currentPage))
    },
    toggleIsFetching: (isFetchingValue) => {
      dispatch(toggleIsFetching(isFetchingValue))
    },
    setTotalCountReportPage: (totalCount) => {
      dispatch(setTotalCountReportPage(totalCount))
    },
    setReport: (reportPage) => {
      dispatch(setReport(reportPage))
    },
  }
}

const ReportTableContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    ReportPage
  )
);

export default ReportTableContainer;

