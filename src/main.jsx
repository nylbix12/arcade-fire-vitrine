import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import App from './App';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.arcadeBlack};
    color: ${({ theme }) => theme.colors.arcadeWhite};
    font-family: ${({ theme }) => theme.fonts.body};
  }
  a {
    color: ${({ theme }) => theme.colors.arcadePink};
  }
`;

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);

