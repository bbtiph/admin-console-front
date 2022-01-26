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

export const RightColumn = css`
  width: 35%;
  flex-direction: column;

  /* Media breakpoint down */
  @media (max-width: ${breakpoints.md}px) {
    display: ${(props) => (props.desktopOnly ? 'none' : 'block')};
  }

  /* Media breakpoint up */
  @media (min-width: ${breakpoints.md}px) {
    display: ${(props) => (props.mobileOnly ? 'none' : 'block')};
  }
`;

/***********/
/* EXPORTS */
/***********/

export default RightColumn;