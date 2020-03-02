import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import {useDispatch} from 'react-redux';
import {FOLLOW_USER_REQUEST, UN_FOLLOW_USER_REQUEST} from '../reducers/user';

const PostCardFollow = ({postUserId, followings}) => {
  if (!followings) {
    return null;
  }

  const dispatch = useDispatch();

  const onFollow = useCallback(
    userId => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: {userId}
      });
    },
    []
  );

  const onUnFollow = useCallback(
    userId => () => {
      dispatch({
        type: UN_FOLLOW_USER_REQUEST,
        data: {userId}
      });
    },
    []
  );

  return followings.find(follow => follow.id === postUserId) ? (
    <Button onClick={onUnFollow(postUserId)}>언팔로우</Button>
  ) : (
    <Button onClick={onFollow(postUserId)}>팔로우</Button>
  );
};

PostCardFollow.propTypes = {
  postUserId: PropTypes.number.isRequired,
  followings: PropTypes.arrayOf(PropTypes.object)
};

PostCardFollow.defaultProps = {
  followings: null
};

export default PostCardFollow;
