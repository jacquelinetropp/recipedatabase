import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
  *:focus {
  outline: 0;
  outline: none;
  }
  :root {
    font-size: 62.5%;
    box-sizing: border-box;
    --color-main: ${(props) => props.theme.colors.main};
    --color-mainDark: ${(props) => props.theme.colors.mainDark};
    --color-mainLight: ${(props) => props.theme.colors.mainLight};
    --color-second: ${(props) => props.theme.colors.second};
    --color-secondLight: ${(props) => props.theme.colors.secondLight};
    --color-text: ${(props) => props.theme.colors.textColor};
    --color-white: ${(props) => props.theme.colors.whiteColor};
    --color-errorRed: ${(props) => props.theme.colors.errorRed};
    --color-offWhite: ${(props) => props.theme.colors.offWhite};
    --shadow: ${(props) => props.theme.colors.shadow};
    @media ${(props) => props.theme.mediaQueries.small} {
      font-size: 60%;
    }
    @media ${(props) => props.theme.mediaQueries.smallest} {
      font-size: 55%;
    }
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }
  a, button {
    cursor: pointer;
  }
  a, input, textarea, button {
    outline: none;
    text-decoration: none;
    font-family: inherit;
  }
  h1, h2, h3, h4, h5, h6 { 
      font-family: 'Architects Daughter', cursive;
  
  }
`;

export default GlobalStyles;
