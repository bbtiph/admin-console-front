/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from "react";
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Redirect, withRouter, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/navSidebar.css';

/* Images */
import cell from '../../assets/icons/cell.svg';
import user from '../../assets/icons/user.svg';
import monitoring from '../../assets/icons/monitoring.svg';
import trash from '../../assets/icons/trash.svg';
import diagram from '../../assets/icons/diagram.svg';

/*****************************************************************************/

function NavSidebar({ history }) {
  return (
    <div className="wrapper ol-md-2 d-none d-md-block">
      <div className="sidebar">
        <ul className="align-middle">
          <li id="user">
            <Link to="/userTable">
              <img src={user} alt={"user"} />Пользователи
            </Link>
          </li>

          <li id="cell">
            <Link to="/reportTable">
              <img src={cell} alt={"cell"} />Отчетность
            </Link>
          </li>

          <li id="cell">
            <Link to="/monitoring">
              <img src={monitoring} alt={"monitoring"} />Мониторинг
            </Link>
          </li>

          <li id="diagram">
            <Link to="/serviceTable">
              <img src={diagram} alt={"diagram"} />Услуги и Сервисы
            </Link>
          </li>

          {/*<li id="trash">*/}
          {/*  <Link to="/">*/}
          {/*    <img src={trash} alt={"trash"} />Корзина*/}
          {/*  </Link>*/}
          {/*</li>*/}
        </ul>
        {/*<Navigation*/}
        {/*    // you can use your own router's api to get pathname*/}
        {/*    activeItemId="/userTable"*/}
        {/*    onSelect={({itemId}) => {*/}
        {/*        if (itemId != "/isParent") {*/}
        {/*            history.push(itemId);*/}
        {/*        }*/}
        {/*    }}*/}
        {/*    items={[*/}
        {/*        {*/}
        {/*            title: 'Пользователи',*/}
        {/*            itemId: '/userTable',*/}
        {/*            elemBefore: () => <img src={user} alt={"user"}/>,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            title: 'Отчетность',*/}
        {/*            itemId: '/reportTable',*/}
        {/*            elemBefore: () => <img src={cell} alt={"user"}/>,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            title: 'Мониторинг',*/}
        {/*            itemId: '/isParent',*/}
        {/*            elemBefore: () => <img src={monitoring} alt={"user"}/>,*/}
        {/*            subNav: [*/}
        {/*                {*/}
        {/*                    title: 'Приложения и сервисы',*/}
        {/*                    itemId: '/monitoring',*/}
        {/*                },*/}
        {/*                {*/}
        {/*                    title: 'Мониторинг серверов',*/}
        {/*                    itemId: '/monitoring',*/}
        {/*                },*/}
        {/*                {*/}
        {/*                    title: 'Мониторинг сетей',*/}
        {/*                    itemId: '/monitoring',*/}
        {/*                },*/}
        {/*                {*/}
        {/*                    title: 'Отчетность',*/}
        {/*                    itemId: '/monitoring',*/}
        {/*                }*/}
        {/*            ],*/}
        {/*        },*/}
        {/*        {*/}
        {/*            title: 'Услуги/Сервисы',*/}
        {/*            itemId: '/serviceTable',*/}
        {/*            elemBefore: () => <img src={diagram} alt={"user"}/>,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            title: 'Корзина',*/}
        {/*            itemId: '/#',*/}
        {/*            elemBefore: () => <img src={trash} alt={"user"}/>,*/}
        {/*        }*/}
        {/*    ]}*/}
        {/*/>*/}
      </div>
    </div>
  );
}

export default withRouter(NavSidebar);
