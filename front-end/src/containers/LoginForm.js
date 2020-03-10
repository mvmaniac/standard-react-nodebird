/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import {Button, Form, Input} from 'antd';
import styled from 'styled-components';

import {LOG_IN_REQUEST} from '../reducers/user';

const LoginFormAntd = styled(Form)`
  padding: 10px !important;

  & div.error {
    color: red;
  }

  & div.buttons {
    padding-top: 8px;
  }

  & div:nth-child(1) {
    margin-bottom: 8px;
  }
`;

const LoginForm = () => {
  // custom hook 를 만들어서 사용할 수 있음
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback(evt => setter(evt.target.value), []);
    return [value, handler];
  };

  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const {isLoggingIn, loginErrorReason} = useSelector(
    state => state.userReducer
  );
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    evt => {
      evt.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          userId,
          password
        }
      });
    },
    [userId, password]
  );

  return (
    <LoginFormAntd onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="login-userId">아이디</label>
        <Input
          id="login-userId"
          name="login-userId"
          required
          value={userId}
          onChange={onChangeUserId}
        />
      </div>
      <div>
        <label htmlFor="login-password">비밀번호:</label>
        <Input
          type="password"
          id="login-password"
          name="login-password"
          required
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="error">{loginErrorReason}</div>
      <div className="buttons">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoggingIn}
          title="로그인"
        >
          로그인
        </Button>
        &nbsp;
        <Link href="/sign-up">
          <Button title="회원가입">회원가입</Button>
        </Link>
      </div>
    </LoginFormAntd>
  );
};

export default LoginForm;
