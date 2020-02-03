import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types'
import AppLayout from '../components/AppLayout';

// component는  next에서 넣어주는 props로
// index.js, profile.js, sign-up.js 안에 있는 component 들이 넘어옴
const NodeBird = ({Component}) => {
  return (
    <>
      <Head>
        <title>NodeBird - Dev</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.css"
        />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired
};

export default NodeBird;
