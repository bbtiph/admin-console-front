'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import styled, { css } from 'styled-components';

/*****************************************************************************/

export const Base = css`
  display: flex;

  flex-direction: ${(props) => props.direction || ''};
  justify-content: ${(props) => props.justifyContent || ''};
  align-items: ${(props) => props.alignItems || ''};
  flex-wrap: ${(props) => (props.wrapItems ? 'wrap' : '')};
  width: ${(props) => props.width || ''};
  margin: ${(props) => props.innerSpace ? `-${props.innerSpace}` : props.margin || ''};
  margin-bottom: ${(props) => props.marginBottom || ''};
  margin-top: ${(props) => props.marginTop || ''};

  > * {
    margin: ${(props) => props.innerSpace ? `${props.innerSpace} !important` : ''};
  }
`;

/***********/
/* EXPORTS */
/***********/

export default Base;