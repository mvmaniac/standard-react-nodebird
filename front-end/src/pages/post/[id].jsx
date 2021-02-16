import React from 'react';
import {useSelector} from 'react-redux';
import {END} from 'redux-saga';
import axios from 'axios';
import {useRouter} from 'next/router';
import Head from 'next/head';

import wrapper from '../../store/configureStore';
import {getPostRequestAction} from '../../reducers/post';
import {loadMyInfoRequestAction} from '../../reducers/user';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const singlePost = useSelector((state) => state.post.singlePost);
  const {user, content, images} = singlePost;

  const router = useRouter();
  const {id} = router.query;

  return (
    <AppLayout>
      <Head>
        <title>{user.nickname}님의 글</title>
        <meta name="description" content={content} />
        <meta property="og:title" content={`${user.nickname}님의 게시글`} />
        <meta property="og:description" content={content} />
        <meta
          property="og:image"
          content={
            images[0] ? images[0].src : 'http://localhost:3060/favicon.ico'
          }
        />
        <meta property="og:url" content={`http://localhost:3060/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
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

    dispatch(loadMyInfoRequestAction());
    dispatch(getPostRequestAction({postId: query.id})); // or context.params.id
    dispatch(END);

    await sagaTask.toPromise();
  }
);

export default Post;
