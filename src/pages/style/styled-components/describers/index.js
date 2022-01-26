/**
 * Describers
 *
 * Project: Post.kz
 * File: /src/styles/styled-components/descibers/index.js
 *
 * Copyright 2021 Kazpost JSC. All rights reserved.
 * Licensed under the EULA License. See License in the project root for license
 * information.
 */

'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import styled, { css } from 'styled-components';

/*******************/
/* PROJECT IMPORTS */
/*******************/

import Normalization from './normalization';

/*****************************************************************************/

export const CenteredChild = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  width: 100vw;
`;

/***********/
/* EXPORTS */
/***********/

export default {
  Normalization,
  CenteredChild,
}