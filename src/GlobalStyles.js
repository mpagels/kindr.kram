import { createGlobalStyle } from 'styled-components'
import OrelegaOneRegular from './assets/fonts/OrelegaOne-Regular.ttf'

export default createGlobalStyle`

@font-face {
    font-family: 'OrelegaOne';
    src: local('OrelegaOne'),
    url(${OrelegaOneRegular}) format('truetype');
    font-display: auto;
    }

* {
    box-sizing: border-box;
}
html {
    height: 100%;
}

body {
    margin: 0;
    background-color: #ffffff;
    color: #000000;
    font-family: "Open Sans";
    height: 100%;
}


:root {
    --font-teal: #457B9D;
    --font-teal-25alpha: rgba(71, 124, 156, 0.25);
    --font-whiteteal: #F1F6F9;
}
`
