/**
 * Layouts
 *
 * Project: Post.kz
 * File: /src/styles/styled-components/common/layout/index.js
 *
 * Copyright 2021 Kazpost JSC. All rights reserved.
 * Licensed under the EULA License. See License in the project root for license
 * information.
 */

'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import styled from 'styled-components';

/*******************/
/* PROJECT IMPORTS */
/*******************/

// import colors from '../variables/colors';

import { Flex } from '../flex';

import describers from './descibers';

/*****************************************************************************/

export const Row = styled(Flex)``;

export const Column = styled(Flex)``;

export const LeftColumn = styled(Flex)``;

export const RightColumn = styled(Flex)``;

/***********/
/* EXPORTS */
/***********/

export default {
  Row,
  Column,
  LeftColumn,
  RightColumn,
}