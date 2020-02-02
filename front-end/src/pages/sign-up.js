/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState} from 'react';
import Head from 'next/head';
import {Form, Input, Checkbox, Button} from 'antd';
import AppLayout from '../components/AppLayout';

export const SignUp = () => {

  
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  // custom hook 를 만들어서 사용할 수 있음
  /*
  const userInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = e => setter(e.target.value);
    return [value, handler];
  }
  const [id, onChangeId] = useInput('');
  */

  const onSubmit = e => {
    e.preventDefault();

    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    console.log({id, nickname, password, passwordCheck, term});
    return {};
  };

  const onChangeId = e => {
    setId(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  const onChangePassord = e => {
    setPassword(e.target.value);
  };

  const onChangePassordCheck = e => {
    const {value} = e.target;
    setPasswordError(value !== password);
    setPasswordCheck(value);
  };

  const onChangeTerm = e => {
    setTermError(false);
    setTerm(e.target.checked);
  };

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
        <Form onSubmit={onSubmit}>
          <br />
          <div>
            <label htmlFor="user-id">아이디:</label>
            <Input id="user-id" name="user-id" required value={id} onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor="user-nickname">별명:</label>
            <Input
              id="user-nickname"
              name="user-nickname"
              required
              value={nickname}
              onChange={onChangeNickname}
            />
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
            <label htmlFor="user-password-check">비밀번호 체크:</label>
            <Input
              type="password"
              id="user-password-check"
              name="user-password-check"
              required
              value={passwordCheck}
              onChange={onChangePassordCheck}
            />
            {passwordError && (
              <div style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <div>
            <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
              약관에 동의합니다.
            </Checkbox>
            {termError && (
              <div style={{color: 'red'}}>약관에 동의하셔야 합니다.</div>
            )}
          </div>
          <br />
          <div>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default SignUp;
