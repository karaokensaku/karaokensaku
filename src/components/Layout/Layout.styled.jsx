import styled from "styled-components";

export const StyledComponent = styled.div`
    display:grid;
    grid-template:
    "... ...... ...... ...... ...... ...... ..." 5px
    "... header header header header header ..." auto
    "... ...... ...... ...... ...... ...... ..." 10px
    "... left   ...... main   main   main   ..." auto
    "... ...... ...... ...... ...... ...... ..." 10px
    "... footer footer footer footer footer ..." auto
    "... ...... ...... ...... ...... ...... ..." 0px /
     2%  23%    10px   auto   auto   auto   2%;


    .header {
      grid-area: header;
    }
    .main {
      grid-area: main;
    }
    .left {
      grid-area:left;
    }
    .footer {
      grid-area: footer;
    }
  `;