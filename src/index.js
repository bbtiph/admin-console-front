/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import './index.css';

/* Components */
import App from './App';

/* Misc */
import reportWebVitals from './reportWebVitals';

/* Redux */
import storeRedux from "./Redux/storeRedux";

/*****************************************************************************/

// export const history = createBrowserHistory({
//   basename: process.env.PUBLIC_URL
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeRedux}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
