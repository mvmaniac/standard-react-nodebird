import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Form, Input} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import {addCommentRequestAction} from '../reducers/post';

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
  const {isAddCommentLoading, isAddCommentDone} = useSelector(
    (state) => state.post
  );

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAddCommentDone) {
      setCommentText('');
    }
  }, [isAddCommentDone, setCommentText]);

  const onSubmitForm = useCallback(() => {
    console.log(myId, post.id, commentText);

    dispatch(
      addCommentRequestAction({
        userId: myId,
        postId: post.id,
        content: commentText
      })
    );
  }, [dispatch, myId, post.id, commentText]);

  return (
    <FormStyled onFinish={onSubmitForm}>
      <Form.Item className="box-item">
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button type="primary" htmlType="submit" loading={isAddCommentLoading}>
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
