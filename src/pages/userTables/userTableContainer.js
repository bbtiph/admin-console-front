/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React, { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/userTable.css';
import './UsersPageStyle.css';

/* Components */
import Preloader from "../../Common/Preloader/Preloader";
import UserTable from "./userTable";

/* Reducers */
import { follow, setCurrentPage, setUsers, toggleIsFetching, unFollow, setTotalCount } from "../../Redux/userTableReducer";

/* Images */
import alert from "../../assets/icons/alert.svg";

/*****************************************************************************/

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.toggleIsFetching(true);

    const config = {
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };

    axios.get(`/admin-console-app/crm-server/api/getAllUsersCount`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          this.props.toggleIsFetching(false)
          this.props.setTotalCount(res.data)
        } else {

          swal.fire(
            ('Ошибка'),
            ('Ваш токен не валидный.'),
            'error',
          );

          setTimeout(() => {
            this.props.history.push('/login');
          }, 30000);
        }
      }
    );

    const endpoint = '/admin-console-app/crm-server/api/searchingWithFilter';

    const queryString = new URLSearchParams();
    queryString.set('page', this.props.usersPage.currentPage - 1);
    queryString.set('size', 10);

    axios.get(`${endpoint}?${queryString.toString()}`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          this.props.toggleIsFetching(false);
          this.props.setUsers({ users: res.data, currentPage: this.props.usersPage.currentPage });
        }
        else {
          this.props.history.push('/login');
        }
      }
    );

  }

  onChangePage = (params) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(params.pageNumber);

    const config = {
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };

    axios.get(`/admin-console-app/crm-server/api/getAllUsersCount`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          this.props.toggleIsFetching(false)
          this.props.setTotalCount(res.data)
        } else {
          swal.fire(
            ('Ошибка'),
            ('Ваш токен не валидный.'),
            'error',
          );
          setTimeout(() => {
            this.props.history.push('/login');
          }, 3000);
        }
      }
    );

    const endpoint = '/admin-console-app/crm-server/api/searchingWithFilter';

    const queryString = new URLSearchParams();
    queryString.set('page', params.pageNumber ? params.pageNumber - 1 : 0 );
    queryString.set('size', 10);
    queryString.set('input', params.input ?? "");
    queryString.set('field', params.field ?? "");

    axios.get(`${endpoint}?${queryString.toString()}`, config).then(
      res => {
        if (res.status >= 200 && res.status <= 299) {
          this.props.toggleIsFetching(false);
          this.props.setUsers({ users: res.data, currentPage: params.pageNumber });
        }
        else {
          this.props.history.push('/login');
        }
      }
    );
  }

  render() {
    return (
      <>
        <div>
          <Preloader isFetching={this.props.usersPage.isFetching} />
          <UserTable usersPage={this.props.usersPage}
            follow={this.props.follow}
            unFollow={this.props.unFollow}
            onChangePage={this.onChangePage}
          />
        </div>
      </>

    );
  }
}

const mapStateToProps = (state) => {
  // ;
  return {
    usersPage: state.usersPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(follow(userId))
    },
    unFollow: (userId) => {
      dispatch(unFollow(userId))
    },
    setUsers: (users) => {
      dispatch(setUsers(users))
    },
    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPage(currentPage))
    },
    toggleIsFetching: (isFetchingValue) => {
      dispatch(toggleIsFetching(isFetchingValue))
    },
    setTotalCount: (totalCount) => {
      dispatch(setTotalCount(totalCount))
    }
  }
}

const UserTableContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    UsersPage
  )
);

export default UserTableContainer;

