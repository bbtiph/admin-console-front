'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import styled, { css } from 'styled-components';

/*******************/
/* PROJECT IMPORTS */
/*******************/

import breakpoints from '../../../variables/breakpoints';

/*****************************************************************************/

export const DesktopOnly = css`
  flex: ${({ flex }) => (flex ? flex : '')};

  /* Media breakpoint down */
  @media (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

/***********/
/* EXPORTS */
/***********/

export default DesktopOnly;