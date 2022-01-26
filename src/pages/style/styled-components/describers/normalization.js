'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import styled, { css } from 'styled-components';

/*******************/
/* PROJECT IMPORTS */
/*******************/

import colors from '../variables/colors';

/*****************************************************************************/

export const Normalization = css`
  html {
    font-size: 16px;
    box-sizing: border-box;
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
  }

  *, *:before, *:after {
    padding: 0;
    margin: 0;
  }

  ::selection {
    background-color: ${colors.black} !important;
    color: ${colors.white} !important;
  }
`;

/***********/
/* EXPORTS */
/***********/

export default Normalization;