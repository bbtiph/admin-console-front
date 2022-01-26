/**
 * Buttons
 *
 * Project: Post.kz
 * File: /src/styles/styled-components/components/button.js
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

import describers from './describers';

/*****************************************************************************/

/**
 * Component: Default Button: a simple button with a basic styling
 * 
 * WARNING: It returns a proper React component which renders an element and
 * applies to it all the styles defined in the template
 */
export const Button = styled.button`${describers.Base}`;

/*****************************************************************************/

/**
 * Component: Default Button
 * 
 * NOTE: The element below overrides default button styles and use it multiple
 * times with different properties
 */
export const DefaultButton = styled(Button)`${describers.Default}`;

export const PrimaryButton = styled(Button)`${describers.Primary}`;

export const SecondaryButton = styled(Button)`${describers.Secondary}`;

export const AlternativeButton = styled(Button)`${describers.Alternative}`;

export const GhostlyButton = styled(Button)`${describers.Ghostly}`;

export const ActionButton = styled(Button)`${describers.Action}`;

export const CloseButton = styled(Button)`${describers.Close}`;

export const LinkButton = styled(Button)`${describers.Link}`;

/***********/
/* EXPORTS */
/***********/

export default {
  DefaultButton,
  PrimaryButton,
  SecondaryButton,
  AlternativeButton,

  GhostlyButton,
  ActionButton,
  CloseButton,
  LinkButton,
}