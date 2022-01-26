/**
 * Headline
 *
 * Project: Post.kz
 * File: /src/styles/styled-components/components/headline.js
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

/*****************************************************************************/

export const Headline = styled.div`
  /* Dynamic font size */
  font-size: ${({ level }) => 4 / level}em;
  font-weight: normal;
  margin: 0;
`;

/***********/
/* EXPORTS */
/***********/

export default {
  Headline,
};