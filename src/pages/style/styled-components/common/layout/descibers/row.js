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

/*
${LeftColumn}, ${RightColumn} {
  width: 100%;
  margin: 0 !important;
}

${RightColumn} {
  margin-top: 1.5rem !important;
}
*/

export const Row = css`
  /* Media breakpoint down */
  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    margin: 0;
  }
`;

/***********/
/* EXPORTS */
/***********/

export default Row;