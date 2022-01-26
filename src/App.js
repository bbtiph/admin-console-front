/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import { BrowserRouter, Switch, Route } from 'react-router-dom';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Components */
import Component from "./components/Component";

/* Pages */
import Login from './pages/auth/Login'
import UserTable from "./pages/userTables/userTable";
import CreateUser from "./pages/userCreate/CreateUser";
import ReportTable from "./pages/report/reportTable";
import ServiceTable from "./pages/service/serviceTable";
import MonitoringApplication from "./pages/monitoring/monitoringApp";
import UserTableContainer from "./pages/userTables/userTableContainer";
import ReportTableContainer from "./pages/report/reportTableContainer";
import ServiceTableContainer from "./pages/service/serviceTableContainer";

/*****************************************************************************/

function App() {
  return (
    <main>
      <BrowserRouter basename={'/admin-console'}>
        <Switch>
          <Route path="/login" render={() => <Login />} exact />
          <Route path="/userTable" render={() => <UserTableContainer />} />
          <Route path="/userCreate" render={() => <CreateUser />} />
          <Route path="/serviceTable" render={() => <ServiceTableContainer />} />
          <Route path="/reportTable" render={() => <ReportTableContainer />} />
          <Route path="/monitoring" render={() => <MonitoringApplication />} />
          <Route path="/" render={() => <Login />} />
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export default App;
