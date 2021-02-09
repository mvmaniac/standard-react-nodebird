import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import {Button, Form, Input, Modal} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import {loginErrorClearAction, loginRequestAction} from '../reducers/user';

const FormStyled = styled(Form)`
  margin: 10px 0 0 10px;
`;

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const isLoginLoading = useSelector((state) => state.user.isLoginLoading);
  const loginError = useSelector((state) => state.user.loginError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loginError) {
      dispatch(loginErrorClearAction());

      Modal.error({
        title: '에러',
        content: loginError.message
      });
    }
  }, [dispatch, loginError]);

  // antd의 onFinish를 사용하는 경우 event.preventDefault를 안해줘도 됨
  const onSubmitForm = useCallback(() => {
    dispatch(
      loginRequestAction({
        email,
        password
      })
    );
  }, [dispatch, email, password]);

  return (
    <FormStyled layout="vertical" onFinish={onSubmitForm}>
      <Form.Item label="이메일" name="userEmail">
        <Input
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일"
          required
        />
      </Form.Item>
      <Form.Item label="비밀번호" name="userPassword">
        <Input.Password
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoginLoading}>
          로그인
        </Button>
        <Link href="/sign-up">
          <Button>회원가입</Button>
        </Link>
      </Form.Item>
    </FormStyled>
  );
};

export default LoginForm;
