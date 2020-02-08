/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import {Button, Form, Input} from 'antd';

import {LOG_IN_REQUEST} from '../reducers/user';

const LoginForm = () => {
  // custom hook 를 만들어서 사용할 수 있음
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback(evt => setter(evt.target.value), []);
    return [value, handler];
  };

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const {isLoggingIn} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    evt => {
      evt.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          id,
          password
        }
      });
    },
    [id, password]
  );

  return (
    <Form onSubmit={onSubmitForm} style={{padding: '10px'}}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <Input id="user-id" name="user-id" required value={id} onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호:</label>
        <Input
          type="password"
          id="user-password"
          name="user-password"
          required
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          로그인
        </Button>
        <Link href="/sign-up">
          <Button>회원가입</Button>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
