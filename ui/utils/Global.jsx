import React from 'react';
import { Global, css } from '@emotion/core';
import { primaryFont, typeScale } from './typography';
import { normalize } from 'polished';
import { defaultTheme } from './themes';

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`
      ${normalize()}
      html {
        font-size: 1rem;
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inhering;
      }

      body {
        margin: 0;
        font-family: ${primaryFont};
      }

      h1 {
        font-size: ${typeScale.header1};
      }
      h2 {
        font-size: ${typeScale.header2};
      }
      h3 {
        font-size: ${typeScale.header3};
      }
      h4 {
        font-size: ${typeScale.header4};
      }
      h5 {
        font-size: ${typeScale.header5};
      }

      label {
        font-size: ${typeScale.paragraph};
        font-weight: bold;
        color: ${defaultTheme.textColor};
      }

      p {
        font-size: ${typeScale.paragraph};
      }

      a {
        font-size: ${typeScale.paragraph};
        color: ${defaultTheme.infoColor};
        margin-top: 1rem;
        text-decoration: none;
      }

      .danger {
        color: ${defaultTheme.dangerColor};
      }

      .main-background {
        background-color: ${defaultTheme.primaryColor};
        color: ${defaultTheme.textColorOnPrimary};
      }

      .success {
        color: ${defaultTheme.successColor};
      }

      main {
        width: 90%;
        margin: 0 auto;
      }
    `}
  />
);
