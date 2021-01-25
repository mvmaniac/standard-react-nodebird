import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import 'antd/dist/antd.css';

// pages들의 공통 부분 (_app.js, _app.jsx, _app.tsx 파일 확장자는 상관 없는듯?)
// 일부 컴포넌트들의 공통은 AppLayout 처럼 만들고 해당 컴포넌트에서 감싸는 방식으로...
const NodeBird = ({Component}) => (
  <>
    <Head>
      <meta charSet="utf-8" />
    </Head>
    <Component />
  </>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired
};

export default NodeBird;
