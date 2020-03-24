import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {Button} from 'antd';
import {FOLLOW_USER_REQUEST, UN_FOLLOW_USER_REQUEST} from '../reducers/user';

const FollowButton = ({post}) => {
  const {me} = useSelector((state) => state.userReducer);

  const postUserId = post.user.id;
  const dispatch = useDispatch();

  const onFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: {userId}
      });
    },
    []
  );

  const onUnFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: UN_FOLLOW_USER_REQUEST,
        data: {userId}
      });
    },
    []
  );

  if (!me || post.user.id === me.id || !me.followings) {
    return null;
  }

  return me.followings.find((follow) => follow.id === postUserId) ? (
    <Button onClick={onUnFollow(postUserId)} title="언팔로우">
      언팔로우
    </Button>
  ) : (
    <Button onClick={onFollow(postUserId)} title="팔로우">
      팔로우
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.object
  }).isRequired
};

export default FollowButton;
