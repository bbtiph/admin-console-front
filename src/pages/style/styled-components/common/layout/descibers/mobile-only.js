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

export const MobileOnly = css`
  flex: ${({ flex }) => (flex ? flex : '')};

  /* Media breakpoint up */
  @media (min-width: ${breakpoints.md}px) {
    display: none;
  }
`;

/***********/
/* EXPORTS */
/***********/

export default MobileOnly;