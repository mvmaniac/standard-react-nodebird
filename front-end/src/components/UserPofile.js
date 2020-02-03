import React from 'react';
import {Card, Avatar} from 'antd';

const dummy = {
    nickname: 'dev',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false
  };

const UserPofile = () => {
  return (
    <Card
      actions={[
        <div key="twit">
          쨱짹
          <br />
          {dummy.Post.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {dummy.Followings.length}
        </div>,
        <div key="follwer">
          팔로워
          <br />
          {dummy.Followers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{dummy.nickname[0]}</Avatar>} title={dummy.nickname} />
    </Card>
  );
};

export default UserPofile;
