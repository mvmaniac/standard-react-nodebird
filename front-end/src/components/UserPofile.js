import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Avatar, Button} from 'antd';

import {logoutAction} from '../reducers/user';

const UserPofile = () => {
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          쨱짹
          <br />
          {user.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {user.followings.length}
        </div>,
        <div key="follwer">
          팔로워
          <br />
          {user.followers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{user.nickname[0]}</Avatar>} title={user.nickname} />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserPofile;
