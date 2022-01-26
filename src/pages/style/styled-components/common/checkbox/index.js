/**
 * Checkbox
 *
 * Project: Post.kz
 * File: /src/styles/styled-components/components/checkbox.js
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

export const CheckboxLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1.25rem;
  color: ${(props) => props.theme.gray5};
  padding-left: 1.5rem;

  &:before {
    position: absolute;
    left: 0;
    top: calc(50% - 0.5em);
    content: '';
    display: block;
    width: 1em;
    height: 1em;
    border: 1px solid ${(props) => props.theme.gray5};
    box-sizing: border-box;
    background: #fff;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0.25em;
    top: calc(50% - 0.25em);
    width: 0.45em;
    height: 0.1875em;
    border-left: 2px solid ${(props) => props.theme.azure};
    border-bottom: 2px solid ${(props) => props.theme.azure};
    transform: rotate(-45deg);
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    opacity: 0;
  }
`;

export const CheckboxBase = styled.div`
  display: flex;
  & input {
    display: none;
    &:checked {
      + ${CheckboxLabel} {
        &:after {
          opacity: 1;
        }
      }
    }
  }
`;

/***********/
/* EXPORTS */
/***********/

export default {
  CheckboxBase,
  CheckboxLabel,
}