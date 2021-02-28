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

import {FRONT_END_URL} from '../../config/config';

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
            images[0] ? images[0].thumbnail : `${FRONT_END_URL}/favicon.ico`
          }
        />
        <meta property="og:url" content={`${FRONT_END_URL}/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({store, req, params}) => {
    const cookie = req?.headers?.cookie ?? '';
    axios.defaults.headers.Cookie = '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const {dispatch, sagaTask} = store;

    dispatch(loadMyInfoRequestAction());
    dispatch(getPostRequestAction({postId: params.id})); // or context.query.id
    dispatch(END);

    await sagaTask.toPromise();
  }
);

// next.js 기능 중의 하나인 정적인 페이지 미리 만들기를 할 경우
// export async function getStaticPaths() {
//   return {
//     paths: [{params: {id: '1'}}, {params: {id: '2'}}, {params: {id: '3'}}],
//     fallback: false // true인 경우 paths 없는 경우 에러가 나지 않고 데이터를 요청함
//   };
// }

// export const getStaticProps = wrapper.getStaticProps(
//   async ({store, req, params}) => {
//     const cookie = req?.headers?.cookie ?? '';
//     axios.defaults.headers.Cookie = '';

//     if (req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }

//     const {dispatch, sagaTask} = store;

//     dispatch(loadMyInfoRequestAction());
//     dispatch(getPostRequestAction({postId: params.id})); // or context.query.id
//     dispatch(END);

//     await sagaTask.toPromise();
//   }
// );

export default Post;
