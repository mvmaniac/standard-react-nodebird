import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Document, {Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

class MyDocument extends Document {
  static getInitialProps (context) {
    const sheet = new ServerStyleSheet();
    const page = context.renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement(); // 순서가 중요함 sheet -> sheet.collectStyles -> sheet.getStyleElement

    return {...page, helmet: Helmet.renderStatic(), styleTags};
  }

  render () {
    const {htmlAttributes, bodyAttributes, ...helmet} = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          <Main />
          <script src="https://polyfill.io/v3/polyfill.min.js?features=es2015,es2016,es2017,es2018,es2019,NodeList.prototype.forEach&flags=gated" />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.propTypes = {
  helmet: PropTypes.shape({}).isRequired,
  styleTags: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MyDocument;
