/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import styled, { keyframes } from 'styled-components';

/*****************************************************************************/

/**
 * 
 * @param {*} waveInpact 
 * @param {*} colors 
 * @returns 
 * 
 * @see: https://styled-components.com/docs/basics
 */
export const pulse = (waveInpact = 24, colors = { r: 255, g: 255, b: 255 }) => keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.7);
  }

  70% {
    box-shadow: 0 0 0 ${waveInpact}px rgba(${colors.r}, ${colors.g}, ${colors.b}, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(${colors.r}, ${colors.g}, ${colors.b}, 0);
  }
`;

/***********/
/* EXPORTS */
/***********/

export default {
  pulse,
}