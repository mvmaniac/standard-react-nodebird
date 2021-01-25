import React, {useCallback} from 'react';
import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

const UserProfile = ({setIsLoggedIn}) => {
  const onLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

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
      <Card.Meta avatar={<Avatar>YHS</Avatar>} />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
