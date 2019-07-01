import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import GlobalStyle from 'global.css.js';
import Container from './main.css.js';

const Layout = ({ data, children }) => (
  <>
    <GlobalStyle />
    <Container>{children}</Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};

export default Layout;