import React from 'react';
import PropTypes from 'prop-types';

const MyError = ({statusCode}) => {
  return (
    <div>
      <h1>{statusCode} 에러 발생</h1>
    </div>
  );
};

MyError.propTypes = {
  statusCode: PropTypes.number.isRequired
};

MyError.getInitialProps = async context => {
  // const statusCode = context.res ? context.res.statusCode : context.err ? context.err.statusCode : null;
  const statusCode = context.res?.statusCode ?? context.err?.statusCode ?? null;
  return {statusCode};
};

export default MyError;
