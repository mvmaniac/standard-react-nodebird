/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Router from 'next/router';
import {Form, Input, Checkbox, Button} from 'antd';

import {SIGN_UP_REQUEST} from '../reducers/user';

const SignUp = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const {isSigningUp, me} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me) {
      alert('로그인 해서 메인 페이지로 이동...');
      Router.push('/');
    }
  }, [me && me.id]); // 객체 말고 기본값으로 하는게 편함

  const onSubmit = useCallback(
    evt => {
      evt.preventDefault();

      if (password !== passwordCheck) {
        return setPasswordError(true);
      }

      if (!term) {
        return setTermError(true);
      }

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          id,
          password,
          nickname
        }
      });
    },
    [password, passwordCheck, term]
  );

  const onChangeId = useCallback(evt => {
    setId(evt.target.value);
  }, []);

  const onChangeNickname = useCallback(evt => {
    setNickname(evt.target.value);
  }, []);

  const onChangePassword = useCallback(evt => {
    setPassword(evt.target.value);
  }, []);

  const onChangePasswordCheck = useCallback(
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
          onChange={onChangePassword}
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
          onChange={onChangePasswordCheck}
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
        <Button type="primary" htmlType="submit" loading={isSigningUp}>
          가입하기
        </Button>
      </div>
    </Form>
  );
};

export default SignUp;
