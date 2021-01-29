import {Button, Form, Input} from 'antd';
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {useSelector} from 'react-redux';
import useInput from '../hooks/useInput';

const FormStyled = styled(Form)`
  div.box-item {
    margin-bottom: 0;
    button {
      float: right;
    }
  }
`;

const CommentForm = ({post}) => {
  const myId = useSelector((state) => state.user.my?.id);

  const [commentText, onChangeCommentText] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log(myId, post.id, commentText);
  }, [myId, post.id, commentText]);

  return (
    <FormStyled onFinish={onSubmitForm}>
      <Form.Item className="box-item">
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button type="primary" htmlType="submit">
          삐약
        </Button>
      </Form.Item>
    </FormStyled>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number
  }).isRequired
};

export default CommentForm;
