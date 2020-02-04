import React from 'react';
import {Button, Form, Input} from 'antd';

const NicknameForm = () => {
  return (
    <Form style={{marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}}>
      <Input addonBefore="별칭" />
      <Button type="primary">수정</Button>
    </Form>
  );
};

export default NicknameForm;
