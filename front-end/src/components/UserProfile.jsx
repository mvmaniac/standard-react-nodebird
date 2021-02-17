import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

import {logoutRequestAction} from '../reducers/user';

const UserProfile = () => {
  const my = useSelector((state) => state.user.my);
  const isLogoutLoading = useSelector((state) => state.user.isLogoutLoading);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, [dispatch]);

  return (
    <Card
      actions={[
        <div key="twit">
          {/* <Link href={`/user/${my.id}`}> */}
          짹짹
          <br />
          {my.posts.length}
          {/* </Link> */}
        </div>,
        <div key="following">
          {/* <Link href="/profile"> */}
          팔로잉
          <br />
          {my.followings.length}
          {/* </Link> */}
        </div>,
        <div key="followings">
          {/* <Link href="/profile"> */}
          팔로워
          <br />
          {my.followers.length}
          {/* </Link> */}
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
