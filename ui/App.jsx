import React from 'react';
import { TEXTS } from '../shared/constants';
import { GlobalStyle } from './theme';
import DashboardContainer from './dashboard/DashboardContainer';

export const App = () => (
  <div>
    <GlobalStyle />
    <h1>{TEXTS.HOME_TITLE}</h1>
    <DashboardContainer />
  </div>
);
