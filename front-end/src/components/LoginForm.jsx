import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Button, Form, Input} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';

const FormStyled = styled(Form)`
  margin: 10px 0 0 10px;
`;

const LoginForm = ({setIsLoggedIn}) => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  // antd의 onFinish를 사용하는 경우 event.preventDefault를 안해줘도 됨
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password, setIsLoggedIn]);

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

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired
};

export default LoginForm;
