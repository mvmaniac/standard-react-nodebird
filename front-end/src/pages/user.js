import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Avatar} from 'antd';

import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../components/PostCard';
import {LOAD_USER_REQUEST} from '../reducers/user';

const User = ({id}) => {
  const {userInfo} = useSelector(state => state.userReducer);
  const {mainPosts} = useSelector(state => state.postReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: {userId: id}
    });

    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: {userId: id}
    });
  }, []);

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

User.propTypes = {
  id: PropTypes.number.isRequired
};

// _app.js에서 NodeBird.getInitialProps에서 가져온 ctx 값이 넘어옴
User.getInitialProps = async context => {
  console.log('user getInitialProps: %s', context.query.id);

  // User 쪽에 id를 props로 전달해줌
  return {id: parseInt(context.query.id, 10)};
};

export default User;
