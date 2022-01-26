'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import styled, { css } from 'styled-components';

/*****************************************************************************/

export const Base = css`
  font-size: 16px;
  // line-height: 1rem;

  /*
  * Inside the templates, it's also possible to use the props that
  * the component will receive to change the style accordingly
  */

  width: ${(props) => (props.fullWidth ? '100%' : '')};
  margin: ${(props) => props.margin || ''};

  &:disabled {
    background: ${(props) => props.theme.gray3};
  }
`;

/***********/
/* EXPORTS */
/***********/

export default Base;