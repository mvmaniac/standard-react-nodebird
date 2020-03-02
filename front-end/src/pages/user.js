import React from 'react';
import {useSelector} from 'react-redux';
import {Card, Avatar} from 'antd';

import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../containers/PostCard';
import {LOAD_USER_REQUEST} from '../reducers/user';

const User = () => {
  const {userInfo} = useSelector(state => state.userReducer);
  const {mainPosts} = useSelector(state => state.postReducer);

  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              쨱짹
              <br />
              {userInfo.posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.followers}
            </div>
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}

      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

// _app.js에서 NodeBird.getInitialProps에서 가져온 ctx 값이 넘어옴
User.getInitialProps = async context => {
  const userId = parseInt(context.query.userId, 10);
  const {store} = context;

  console.log('user getInitialProps: %s', userId);

  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: {userId}
  });

  store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: {userId}
  });

  // User 쪽에 id를 props로 전달해줌
  // return {id: userId};
};

export default User;
