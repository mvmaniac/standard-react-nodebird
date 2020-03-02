import React, {useCallback} from 'react';
import {Button, List, Card, Icon} from 'antd';
import {useDispatch, useSelector} from 'react-redux';

import NicknameForm from '../containers/NicknameForm';
import PostCard from '../containers/PostCard';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UN_FOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST
} from '../reducers/user';
import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';

const Profile = () => {
  const {followers, followings, hasMoreFollowings, hasMoreFollowers} = useSelector(
    state => state.userReducer
  );
  const {mainPosts} = useSelector(state => state.postReducer);
  const dispatch = useDispatch();

  const onUnFollow = useCallback(
    userId => () => {
      dispatch({
        type: UN_FOLLOW_USER_REQUEST,
        data: {userId}
      });
    },
    []
  );

  const onRemoveFollower = useCallback(
    userId => () => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: {userId}
      });
    },
    []
  );

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      data: {
        offset: followings.length
      }
    });
  }, [followings.length]);

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      data: {
        offset: followers.length
      }
    });
  }, [followers.length]);

  return (
    <div>
      <NicknameForm />
      <List
        style={{marginBottom: '20px'}}
        grid={{gutter: 4, xs: 2, md: 3}}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={
          hasMoreFollowings && (
            <Button style={{width: '100%'}} onClick={loadMoreFollowings}>
              더 보기
            </Button>
          )
        }
        bordered
        dataSource={followings}
        renderItem={item => (
          <List.Item style={{marginTop: '20px'}}>
            <Card actions={[<Icon type="stop" />]} onClick={onUnFollow(item.id)}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{marginBottom: '20px'}}
        grid={{gutter: 4, xs: 2, md: 3}}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={
          hasMoreFollowers && (
            <Button style={{width: '100%'}} onClick={loadMoreFollowers}>
              더 보기
            </Button>
          )
        }
        bordered
        dataSource={followers}
        renderItem={item => (
          <List.Item style={{marginTop: '20px'}}>
            <Card actions={[<Icon type="stop" />]} onClick={onRemoveFollower(item.id)}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

Profile.getInitialProps = async context => {
  const {store} = context;
  const user = store.getState().userReducer;

  // 이 직전에 _app.js 에서 LOAD_USER_REQUEST 실행되는데
  // LOAD_USER_REQUEST가 끝나야 me 객체가 생김
  store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: {
      userId: user.me && user.me.id
    }
  });

  store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: {
      userId: user.me && user.me.id
    }
  });

  store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: {
      userId: user.me && user.me.id
    }
  });
};

export default Profile;
