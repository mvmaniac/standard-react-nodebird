import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {END} from 'redux-saga';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import {Form, Input, Checkbox, Button, Alert} from 'antd';
import styled from 'styled-components';

import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import {
  loadMyInfoRequestAction,
  signUpCompleteAction,
  signUpRequestAction
} from '../reducers/user';

const AlertStyled = styled(Alert)`
  margin: 0 0 0 10px;
`;

const FormStyled = styled(Form)`
  margin: 10px 0 0 10px;
`;

const SignUp = () => {
  const {isSignUpLoading, isSignUpDone, signUpError, isLoginDone} = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoginDone) {
      // 회원가입 페이지에서 로그인을 완료 했다면 메인 페이지로 이동
      Router.replace('/');
    }
  }, [dispatch, isLoginDone]);

  useEffect(() => {
    if (isSignUpDone) {
      dispatch(signUpCompleteAction());

      // 회원가입 완료 시 메인 페이지로 이동
      Router.replace('/');
    }
  }, [dispatch, isSignUpDone]);

  const onSubmitForm = useCallback(
    (values) => {
      console.log('Received values of form: ', values);

      const {email, nickname, password} = values;
      dispatch(signUpRequestAction({email, nickname, password}));
    },
    [dispatch]
  );

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        {signUpError && (
          <AlertStyled
            message="에러"
            description={signUpError.message}
            type="error"
            showIcon
            closable
          />
        )}
        <FormStyled layout="vertical" onFinish={onSubmitForm}>
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: '유효하지 않는 이메일 형식입니다.'
              }
            ]}
          >
            <Input placeholder="이메일" />
          </Form.Item>

          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[
              {
                required: true,
                message: '닉네임을 입력해 주세요.'
              }
            ]}
          >
            <Input placeholder="닉네임" />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해 주세요.'
              }
            ]}
          >
            <Input.Password placeholder="비밀번호" />
          </Form.Item>

          <Form.Item
            label="비밀번호 확인"
            name="passwordCheck"
            rules={[
              {
                required: true,
                message: '비밀번호 확인을 입력해 주세요.'
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('비밀번호가 일치하지 않습니다.')
                  );
                }
              })
            ]}
          >
            <Input.Password placeholder="비밀번호 확인" />
          </Form.Item>

          <Form.Item
            name="term"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('약관에 동의하셔야 합니다.'))
              }
            ]}
          >
            <Checkbox>제로초 말을 잘 들을 것을 동의합니다.</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSignUpLoading}>
              가입하기
            </Button>
          </Form.Item>
        </FormStyled>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({store, req}) => {
    console.log('getServerSideProps start...');

    // 프론트 서버에서 수행하므로 쿠키를 임의로 넣어주어야 함
    const cookie = req?.headers?.cookie ?? '';
    axios.defaults.headers.Cookie = '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const {dispatch, sagaTask} = store;

    dispatch(loadMyInfoRequestAction());
    dispatch(END);

    await sagaTask.toPromise();
    console.log('getServerSideProps end...');
  }
);

export default SignUp;
