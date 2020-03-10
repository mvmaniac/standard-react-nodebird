import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import NicknameForm from '../containers/NicknameForm';
import PostCard from '../containers/PostCard';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  UN_FOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  CLEAR_FOLLOWS
} from '../reducers/user';
import {LOAD_USER_POSTS_REQUEST, CLEAR_POSTS} from '../reducers/post';
import UserFollow from '../components/UserFollow';

const Profile = () => {
  const {
    me,
    followers,
    followings,
    hasMoreFollowings,
    hasMoreFollowers
  } = useSelector(state => state.userReducer);
  const {mainPosts} = useSelector(state => state.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me) {
      // TODO: SSR과 중복되는데...
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

      return;
    }

    dispatch({
      type: CLEAR_POSTS
    });

    dispatch({
      type: CLEAR_FOLLOWS
    });
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
    <div style={{marginTop: '10px'}}>
      <NicknameForm />
      <UserFollow
        header="팔로잉 목록"
        hasMore={hasMoreFollowings}
        data={followings}
        onClickMore={loadMoreFollowings}
        onClickRemove={onUnFollow}
      />
      <UserFollow
        header="팔로워 목록"
        hasMore={hasMoreFollowers}
        data={followers}
        onClickMore={loadMoreFollowers}
        onClickRemove={onRemoveFollower}
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
