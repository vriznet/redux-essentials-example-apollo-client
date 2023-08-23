import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #fff;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: #000;
  }
  a {
    text-decoration: none;
    color: #000;
    &:hover, &:focus, &:active, &:visited, &:link {
      color: #000;
    }
  }
`;
