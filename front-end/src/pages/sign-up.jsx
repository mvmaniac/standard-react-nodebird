import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Head from 'next/head';
import {Form, Input, Checkbox, Button} from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import {SIGN_UP_REQUEST} from '../reducers/user';

const FormStyled = styled(Form)`
  margin: 10px 0 0 10px;
`;

const SignUp = () => {
  const isSignUpLoading = useSelector((state) => state.user.isSignUpLoading);

  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    (values) => {
      console.log('Received values of form: ', values);

      const {email, nickname, password} = values;

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {email, nickname, password}
      });
    },
    [dispatch]
  );

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
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
