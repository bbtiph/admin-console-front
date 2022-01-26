/**
 * Layout Describer
 *
 * Project: Post.kz
 * File: /src/styles/styled-components/common/layout/describers/index.js
 *
 * Copyright 2021 Kazpost JSC. All rights reserved.
 * Licensed under the EULA License. See License in the project root for license
 * information.
 */

'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import Row from './row';

import Column from './column';
import LeftColumn from './left-column';
import RightColumn from './right-column';

import DesktopOnly from './desktop-only';
import MobileOnly from './mobile-only';

/*****************************************************************************/

/***********/
/* EXPORTS */
/***********/

export default {
  Row,

  Column,
  LeftColumn,
  RightColumn,

  DesktopOnly,
  MobileOnly,
}