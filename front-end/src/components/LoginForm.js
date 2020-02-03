/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useCallback} from 'react';
import Link from 'next/link';
import {Input, Button, Form} from 'antd';

const LoginForm = () => {
  // custom hook 를 만들어서 사용할 수 있음
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback(evt => setter(evt.target.value), []);
    return [value, handler];
  };

  const [id, onChangeId] = useInput('');
  const [password, onChangePassord] = useInput('');

  const onSubmitForm = useCallback(
    evt => {
      evt.preventDefault();
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
          onChange={onChangePassord}
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>
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
