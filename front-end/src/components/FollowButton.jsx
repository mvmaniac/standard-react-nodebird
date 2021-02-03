import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'antd';

import {followRequestAction, unFollowRequestAction} from '../reducers/user';

const FollowButton = ({post}) => {
  const {my, isFollowLoading, isUnFollowLoading} = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const isFollowing = my?.followings.find(
    (follow) => follow.id === post.user.id
  );

  const onFollow = useCallback(() => {
    if (isFollowing) {
      dispatch(unFollowRequestAction(post.user.id));
      return;
    }
    dispatch(followRequestAction(post.user.id));
  }, [dispatch, isFollowing, post.user.id]);

  return (
    <Button onClick={onFollow} loading={isFollowLoading || isUnFollowLoading}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number
    })
  }).isRequired
};

export default FollowButton;
