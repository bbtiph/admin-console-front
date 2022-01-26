'use strict';

/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import styled, { createGlobalStyle } from 'styled-components';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Variables */
import colors from './variables/colors';

/* Components */
import Headline from './common/headline';
import Buttons from './common/button';
import Flex from './common/flex';
import Layout from './common/layout';
import Checkbox from './common/checkbox';

/* Describers */
import describers from './describers';

/*****************************************************************************/

export const GlobalStyles = createGlobalStyle`
  ${describers.Normalization}

  html {
    font-size: 16px;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }
`;

/***********/
/* EXPORTS */
/***********/

export default {
  GlobalStyles,

  components: {
    Headline,
    Buttons,
    Flex,
    Layout,
    Checkbox,
  },

  describers,
}