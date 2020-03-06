/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Router from 'next/router';
import {Form, Input, Checkbox, Button} from 'antd';
import styled from 'styled-components';

import {SIGN_UP_REQUEST} from '../reducers/user';

const SignUpFormAntd = styled(Form)`
  padding: 10px !important;

  & div.error {
    color: red;
  }

  & div {
    margin-bottom: 8px;
  }

  & div.buttons {
    float: right;
  }
`;


const SignUp = () => {
  const [userId, setUserId] = useState('');
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
  }, [me && me.userId]); // 객체 말고 기본값으로 하는게 편함

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
          userId,
          password,
          nickname
        }
      });

      // eslint 때문에 추가
      return true;
    },
    [userId, nickname, password, passwordCheck, term]
  );

  const onChangeUserId = useCallback(evt => {
    setUserId(evt.target.value);
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

  if (me) {
    return null;
  }

  return (
    <SignUpFormAntd onSubmit={onSubmit}>      
      <div>
        <label htmlFor="sign-userId">아이디:</label>
        <Input id="sign-userId" name="userId" required value={userId} onChange={onChangeUserId} />
      </div>
      <div>
        <label htmlFor="sign-nickname">별명:</label>
        <Input
          id="sign-nickname"
          name="sign-nickname"
          required
          value={nickname}
          onChange={onChangeNickname}
        />
      </div>
      <div>
        <label htmlFor="sign-password">비밀번호:</label>
        <Input
          type="password"
          id="sign-password"
          name="sign-password"
          required
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <label htmlFor="sign-password-check">비밀번호 체크:</label>
        <Input
          type="password"
          id="sign-password-check"
          name="sign-password-check"
          required
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
        {passwordError && <div className="error">비밀번호가 일치하지 않습니다.</div>}
      </div>
      <div>
        <Checkbox name="sign-term" checked={term} onChange={onChangeTerm}>
          약관에 동의합니다.
        </Checkbox>
        {termError && <div className="error">약관에 동의하셔야 합니다.</div>}
      </div>
      <div className="buttons">
        <Button type="primary" htmlType="submit" loading={isSigningUp} title="가입하기">
          가입하기
        </Button>
      </div>
    </SignUpFormAntd>
  );
};

export default SignUp;
