import { createGlobalStyle } from 'styled-components'
export const GlobalStyles = createGlobalStyle`
  *,*::before,*::after {
    box-sizing: border-box;
    padding:0;
    margin:0;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    font-family: "Josefin Sans", sans-serif;;
    box-sizing: inherit;
    font-size: 18px;
    line-height: 1.5;
    min-height: 100vh;
  }

  img {
    vertical-align: middle;
    max-width: 100%;
    height: auto;
  }

  ul,
  li {
    list-style: none;
  }
`

export const colorPrimary = 'hsl(220, 98%, 61%)'
export const colorCheck = 'linear-gradient(to bottom right, rgb(87, 221, 255), hsl(280, 87%, 65%))'

// LIGHT THEME
export const colorlightGray100 = 'hsl(0, 0%, 98%)'
export const colorlightGray200 = 'hsl(236, 33%, 92%)'
export const colorlightGray300 = 'hsl(233, 11%, 84%)'
export const colorlightGray400 = 'hsl(236, 9%, 61%)'
export const colorlightGray500 = 'hsl(235, 19%, 35%)'


// DARK THEME
export const colordarkBlue900 = 'hsl(235, 21%, 11%)'
export const colordarkBlue800 = 'hsl(235, 24%, 19%)'

export const colordarkGray100 = 'hsl(236, 33%, 92%)'
export const colordarkGray200 = 'hsl(234, 39%, 85%)'
export const colordarkGray300 = 'hsl(234, 11%, 52%)'
export const colordarkGray400 = 'hsl(233, 14%, 35%)'
export const colordarkGray500 = 'hsl(237, 14%, 26%)'