import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Head from 'next/head';
import {Avatar, Card} from 'antd';
import {END} from 'redux-saga';
import styled from 'styled-components';

import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import {
  loadMyInfoRequestAction,
  loadUserInfoRequestAction
} from '../../reducers/user';
import {loadPostByUserRequestAction} from '../../reducers/post';

const CardStyled = styled(Card)`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const User = () => {
  const router = useRouter();
  const {id} = router.query;

  const {my, other} = useSelector((state) => state.user);
  const {mainPosts, hasMorePost, isLoadPostLoading} = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    function onScroll() {
      const {pageYOffset} = window;
      const {clientHeight, scrollHeight} = document.documentElement;

      if (
        pageYOffset + clientHeight > scrollHeight - 300 &&
        hasMorePost &&
        !isLoadPostLoading
      ) {
        const lastId = mainPosts[mainPosts.length - 1]?.id ?? 0;
        dispatch(
          loadPostByUserRequestAction({
            lastId,
            userId: id
          })
        );
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, hasMorePost, isLoadPostLoading, mainPosts, id]);

  return (
    <AppLayout>
      {other && (
        <Head>
          <title>
            {other.nickname}
            님의 글
          </title>
          <meta name="description" content={`${other.nickname}님의 게시글`} />
          <meta property="og:title" content={`${other.nickname}님의 게시글`} />
          <meta
            property="og:description"
            content={`${other.nickname}님의 게시글`}
          />
          <meta
            property="og:image"
            content="https://nodebird.com/favicon.ico"
          />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {other && other.id !== my?.id ? (
        <CardStyled
          actions={[
            <div key="twit">
              짹짹
              <br />
              {other.posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {other.followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {other.followers}
            </div>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{other.nickname[0]}</Avatar>}
            title={other.nickname}
          />
        </CardStyled>
      ) : null}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({store, req, query}) => {
    const cookie = req?.headers?.cookie ?? '';
    axios.defaults.headers.Cookie = '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const {dispatch, sagaTask} = store;
    const {id} = query;

    dispatch(loadMyInfoRequestAction());
    dispatch(loadUserInfoRequestAction({userId: id}));
    dispatch(loadPostByUserRequestAction({userId: id}));
    dispatch(END);

    await sagaTask.toPromise();
  }
);

export default User;
