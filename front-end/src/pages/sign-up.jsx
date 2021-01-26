import React, {useCallback} from 'react';
import Head from 'next/head';
import {Form, Input, Checkbox, Button} from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';

const FormStyled = styled(Form)`
  margin: 10px 0 0 10px;
`;

const SignUp = () => {
  const onSubmitForm = useCallback((values) => {
    console.log('Received values of form: ', values);
  }, []);

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <FormStyled layout="vertical" onFinish={onSubmitForm}>
          <Form.Item
            label="아이디"
            name="userId"
            rules={[
              {
                required: true,
                message: '아이디를 입력해 주세요.'
              }
            ]}
          >
            <Input placeholder="아이디" />
          </Form.Item>

          <Form.Item
            label="닉네임"
            name="userNickname"
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
            name="userPassword"
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
            name="userPasswordCheck"
            rules={[
              {
                required: true,
                message: '비밀번호 확인을 입력해 주세요.'
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('userPassword') === value) {
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
            name="userTerm"
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
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
        </FormStyled>
      </AppLayout>
    </>
  );
};

export default SignUp;
