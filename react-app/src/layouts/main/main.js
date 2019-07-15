import React from "react";
import GlobalStyle from "../../global.css.js";
import Container from "./main.css.js";

const Layout = ({ data, children }) => (
  <>
    <GlobalStyle />
    <Container>{children}</Container>
  </>
);

export default Layout;
