import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    /* background-color:pink; */
    $breakpoint: 600px;

    @mixin mq {
      @media screen and (max-width: $breakpoint) {
        @content;
      }
    }

    /* これで
    @include mq {
      適応したいCSS
    }
    とすればどこでもOK？ */
  }
`