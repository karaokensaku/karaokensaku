import styled from "styled-components";
const mq = "@media (max-width:600px)";
export const StyledComponent = styled.div`
    display:grid;
    grid-template:
    "... ...... ...... ...... ...... ...... ..." 0
    "... header header header header header ..." auto
    "... ...... ...... ...... ...... ...... ..." 0
    "... left   ...... main   main   main   ..." auto
    "... ...... ...... ...... ...... ...... ..." 0
    "... footer footer footer footer footer ..." auto
    "... ...... ...... ...... ...... ...... ..." 0 /
     0   23%    0      auto   auto    auto  0;

    /* ${mq}{
          grid-template:
          "...... ...... ......" 0
          "header header header" auto
          "...... ...... ......" 0
          "main   main   main  " auto
          "...... ...... ......" 0
          "footer footer footer" auto
          "...... ...... ......" 0 /
            auto   auto   auto;
        } */

    .header {
      grid-area: header;
    }
    .main {
      grid-area: main;
    }
    .left {
      grid-area: left;
    }
    .footer {
      grid-area: footer;
    }
  `;