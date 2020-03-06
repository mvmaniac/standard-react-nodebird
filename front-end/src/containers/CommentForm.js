import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Form, Input, Button} from 'antd';

import {ADD_COMMENT_REQUEST} from '../reducers/post';

const CommentForm = ({post}) => {
  const [commentText, setCommentText] = useState('');

  const {me} = useSelector(state => state.userReducer);
  const {isAddingComment, isAddedComment} = useSelector(state => state.postReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    setCommentText('');
  }, [isAddedComment === true]);

  const onSubmitCommentForm = useCallback(
    evt => {
      evt.preventDefault();

      if (!me) {
        alert('로그인이 필요합니다');
        return;
      }

      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          content: commentText
        }
      });
    },
    [me && me.id, commentText]
  );

  const onChangeComment = useCallback(evt => {
    setCommentText(evt.target.value);
  }, []);

  return (
    <Form onSubmit={onSubmitCommentForm}>
      <Form.Item>
        <Input.TextArea row={4} value={commentText} onChange={onChangeComment} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isAddingComment} title="삐약">
        삐약
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number
  }).isRequired
};

export default CommentForm;
