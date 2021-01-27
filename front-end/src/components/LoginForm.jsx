import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import Link from 'next/link';
import {Button, Form, Input} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import {loginAction} from '../reducers/user';

const FormStyled = styled(Form)`
  margin: 10px 0 0 10px;
`;

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const dispatch = useDispatch();

  // antd의 onFinish를 사용하는 경우 event.preventDefault를 안해줘도 됨
  const onSubmitForm = useCallback(() => {
    dispatch(
      loginAction({
        id,
        password
      })
    );
  }, [dispatch, id, password]);

  return (
    <FormStyled layout="vertical" onFinish={onSubmitForm}>
      <Form.Item label="아이디" name="userId">
        <Input value={id} onChange={onChangeId} placeholder="아이디" required />
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
        <Button type="primary" htmlType="submit" loading={false}>
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
