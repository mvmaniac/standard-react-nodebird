import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import {logoutRequestAction} from '../reducers/user';

const UserProfile = () => {
  const my = useSelector((state) => state.user.my);
  const isLogoutLoading = useSelector((state) => state.user.isLogoutLoading);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction);
  }, [dispatch]);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="following">
          팔로잉
          <br />0
        </div>,
        <div key="followings">
          팔로워
          <br />0
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{my.nickname[0]}</Avatar>}
        title={my.nickname}
      />
      <Button onClick={onLogout} loading={isLogoutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
