/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React, { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert2";

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Components */
import Preloader from "../../Common/Preloader/Preloader";
import ServiceTable from "./serviceTable";

/* Reducers */
import { setCurrentPage, toggleIsFetching, setTotalCount, setServices } from "../../Redux/serviceTableReducer";

/*****************************************************************************/

class ServicePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onChangePage({
      pageNumber: 1,
      input: "",
      field: ""
    })
  }

  onChangePage = (params) => {
    this.props.setCurrentPage(params.pageNumber);

    const config = {
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };

    axios.get(`/admin-console-app/crm-server/v2/get-all-operators-count`, config).then(
      res => {
        console.log('r>', res.data[0]);
        if (res.status >= 200 && res.status <= 299) {
          this.props.toggleIsFetching(false)
          this.props.setTotalCount(res.data[0])
        } else {
          swal.fire(
            ('Ошибка'),
            ('Ваш токен не валидный.'),
            'error',
          );
        }
      }
    );

    const endpoint = '/admin-console-app/crm-server/v2/get-all-operators';

    const queryString = new URLSearchParams();
    queryString.set('page', params.pageNumber ? params.pageNumber - 1 : 0);
    queryString.set('size', 10);
    queryString.set('input', params.input ?? "");
    queryString.set('field', params.field ?? "");

    axios.get(`${endpoint}?${queryString.toString()}`, config).then(
      res => {
        console.log('rr>>' + res.data);
        if (res.status >= 200 && res.status <= 299) {
          this.props.toggleIsFetching(false);
          this.props.setServices({ servicePage: res.data, currentPage: params.pageNumber });
        }
        else {
          this.props.history.push('/serviceTable');
        }
      }
    );
  }

  render() {

    return (
      <>
        <div>
          <Preloader isFetching={this.props.servicePage.isFetching} />
          <ServiceTable servicePage={this.props.servicePage} onChangePage={this.onChangePage} />
        </div>
      </>
    );
  }
}

/*********/
/* REDUX */
/*********/

const mapStateToProps = (state) => {
  return {
    servicePage: state.servicePage
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
    setTotalCount: (totalCount) => {
      dispatch(setTotalCount(totalCount))
    },
    setServices: (servicePage) => {
      dispatch(setServices(servicePage))
    },
  }
}

const ServiceTableContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    ServicePage
  )
);

export default ServiceTableContainer;

