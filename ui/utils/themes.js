/**
 * This file is created to manage different themes that the app could have.
 * This demo only consider one.
 */

import { green, neutral, red, orange } from './colors';

export const defaultTheme = {
  primaryColor: orange[100],
  primaryColorHover: green[100],
  primaryColorActive: green[100],
  textColorOnPrimary: neutral[200],
  textColor: neutral[100],
  darkTextColor: green[200],
  inputColor: neutral[300],
  inputColorText: neutral[600],
  successColor: green[100],
  dangerColor: red[100],
};
