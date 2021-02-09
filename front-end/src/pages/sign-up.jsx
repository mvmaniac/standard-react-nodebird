import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import {Form, Input, Checkbox, Button, Alert} from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import {signUpRequestAction} from '../reducers/user';

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

export default SignUp;
