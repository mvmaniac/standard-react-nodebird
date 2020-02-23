import React, {useEffect, useCallback} from 'react';
import {Button, List, Card, Icon} from 'antd';
import {useDispatch, useSelector} from 'react-redux';

import NicknameForm from '../components/NicknameForm';
import PostCard from '../components/PostCard';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UN_FOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST
} from '../reducers/user';
import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';

const Profile = () => {
  const {me, followers, followings} = useSelector(state => state.userReducer);
  const {mainPosts} = useSelector(state => state.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: {
          userId: me.id
        }
      });

      dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: {
          userId: me.id
        }
      });

      dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: {
          userId: me.id
        }
      });
    }
  }, [me && me.id]);

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

  return (
    <div>
      <NicknameForm />
      <List
        style={{marginBottom: '20px'}}
        grid={{gutter: 4, xs: 2, md: 3}}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{width: '100%'}}>더 보기</Button>}
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
        loadMore={<Button style={{width: '100%'}}>더 보기</Button>}
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

export default Profile;
