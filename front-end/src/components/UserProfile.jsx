import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import styled from 'styled-components';

import {logoutRequestAction} from '../reducers/user';

const AvatarStyled = styled(Avatar)`
  cursor: pointer;
`;

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
        <Link href={`/user/${my.id}`} key="twit">
          <div>
            짹짹
            <br />
            {my.posts.length}
          </div>
        </Link>,
        <Link href="/profile" key="following">
          <div>
            팔로잉
            <br />
            {my.followings.length}
          </div>
        </Link>,
        <Link href="/profile" key="followings">
          <div>
            팔로워
            <br />
            {my.followers.length}
          </div>
        </Link>
      ]}
    >
      <Card.Meta
        avatar={
          <Link href="/profile">
            <AvatarStyled>{my.nickname[0]}</AvatarStyled>
          </Link>
        }
        title={my.nickname}
      />
      <Button onClick={onLogout} loading={isLogoutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
