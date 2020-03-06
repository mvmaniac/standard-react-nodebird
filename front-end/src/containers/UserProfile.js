import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Avatar, Button} from 'antd';

import Link from 'next/link';
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
      style={{margin: "10px 0 0 10px"}}
      actions={[
        <Link href="/profile" key="twit">
          <div>
            쨱짹
            <br />
            {me.posts && me.posts.length}
          </div>
        </Link>,
        <Link href="/profile" key="following">
          <div>
            팔로잉
            <br />
            {me.followings && me.followings.length}
          </div>
        </Link>,
        <Link href="/profile" key="follower">
          <div>
            팔로워
            <br />
            {me.followers && me.followers.length}
          </div>
        </Link>
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button onClick={onLogout} title="로그아웃">로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
