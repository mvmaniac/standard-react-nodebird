import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Avatar, Button} from 'antd';

import {LOG_OUT_REQUEST} from '../reducers/user';

const UserProfile = () => {
  const {me} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          쨱짹
          <br />
          {me.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {me.followings.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {me.followers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
