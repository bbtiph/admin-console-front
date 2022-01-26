/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { render } from "@testing-library/react";

/*****************************************************************************/

export default function MonitoringHeader() {
  <>
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>);
  </>
}