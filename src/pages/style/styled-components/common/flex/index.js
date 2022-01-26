/**
 * Flex
 *
 * Project: Post.kz
 * File: /src/styles/styled-components/common/flex/index.js
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

import describers from './descibers';

/*****************************************************************************/

export const Flex = styled.div`${describers.Base}`;

export const WrappedFlex = styled(Flex)`${describers.Wrapped}`;

/***********/
/* EXPORTS */
/***********/

export default {
  Flex,
  WrappedFlex,
}