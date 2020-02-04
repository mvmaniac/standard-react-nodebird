/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Input, Checkbox, Button} from 'antd';

import {signUpAction} from '../reducers/user';

const SignUp = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    evt => {
      evt.preventDefault();

      if (password !== passwordCheck) {
        return setPasswordError(true);
      }

      if (!term) {
        return setTermError(true);
      }

      dispatch(
        signUpAction({
          id,
          password,
          nickname
        })
      );
    },
    [password, passwordCheck, term]
  );

  const onChangeId = useCallback(evt => {
    setId(evt.target.value);
  }, []);

  const onChangeNickname = useCallback(evt => {
    setNickname(evt.target.value);
  }, []);

  const onChangePassord = useCallback(evt => {
    setPassword(evt.target.value);
  }, []);

  const onChangePassordCheck = useCallback(
    evt => {
      const {value} = evt.target;
      setPasswordError(value !== password);
      setPasswordCheck(value);
    },
    [password]
  );

  const onChangeTerm = useCallback(evt => {
    setTermError(false);
    setTerm(evt.target.checked);
  }, []);

  return (
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
        {passwordError && <div style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>}
      </div>
      <div>
        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
          약관에 동의합니다.
        </Checkbox>
        {termError && <div style={{color: 'red'}}>약관에 동의하셔야 합니다.</div>}
      </div>
      <br />
      <div>
        <Button type="primary" htmlType="submit">
          가입하기
        </Button>
      </div>
    </Form>
  );
};

export default SignUp;
