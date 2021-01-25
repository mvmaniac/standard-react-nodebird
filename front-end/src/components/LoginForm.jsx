import React, {useState, useCallback} from 'react';
import Link from 'next/link';
import {Button, Form, Input} from 'antd';
import styled from 'styled-components';

const FormLogin = styled(Form)`
  margin: 10px 0 0 10px;
`;

const LoginForm = ({setIsLoggedIn}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((event) => {
    setId(event.target.value);
  }, []);

  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  // antd의 onFinish를 사용하는 경우 event.preventDefault를 안해줘도 됨
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password, setIsLoggedIn]);

  return (
    <FormLogin layout="vertical" onFinish={onSubmitForm}>
      <Form.Item label="아이디" id="userId">
        <Input value={id} onChange={onChangeId} placeholder="아이디" required />
      </Form.Item>
      <Form.Item label="비밀번호" id="userPassword">
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
    </FormLogin>
  );
};

export default LoginForm;
