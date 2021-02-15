import React, {useEffect} from 'react'; // next.js 에서는 react를 import 안해도 실행 가능 함...
import {useDispatch, useSelector} from 'react-redux';
import {END} from 'redux-saga';
import axios from 'axios';
import {Modal} from 'antd';

import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {loadPostRequestAction, retweetErrorClearAction} from '../reducers/post';
import {loadMyInfoRequestAction} from '../reducers/user';

const Home = () => {
  const my = useSelector((state) => state.user.my);
  const {mainPosts, hasMorePost, isLoadPostLoading, retweetError} = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (retweetError) {
      Modal.error({
        title: '에러',
        content: retweetError.message
      });
      dispatch(retweetErrorClearAction());
    }
  }, [dispatch, retweetError]);

  useEffect(() => {
    function onScroll() {
      // scrollY: 얼마나 내렸는지
      // clientHeight: 화면 보이는 길이
      // scrollHeight: 총 길이
      //
      // console.log(
      //   window.scrollY,
      //   document.documentElement.clientHeight,
      //   document.documentElement.scrollHeight
      // );

      const {pageYOffset} = window;
      const {clientHeight, scrollHeight} = document.documentElement;

      if (
        pageYOffset + clientHeight > scrollHeight - 300 &&
        hasMorePost &&
        !isLoadPostLoading
      ) {
        const lastId = mainPosts[mainPosts.length - 1]?.id ?? 0;
        dispatch(
          loadPostRequestAction({
            lastId
          })
        );
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, hasMorePost, isLoadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {my && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

// Home 보다 먼저 실행 됨, 여기가 실행되면 reducer 쪽의 HYDRATE(하이드레이트?)가 실행됨
// 브라우저에서 실행 되는 거라면 자동으로 브라우저에서 보내주지만
// 아래 함수는 서버사이드 렌더링이기 때문에 쿠키를 담아서 보내주어야 함
// 서버사이드 렌더링은 프론트 서버에서 실행됨
export const getServerSideProps = wrapper.getServerSideProps(
  async ({store, req}) => {
    console.log('getServerSideProps start...');

    // 프론트 서버에서 수행하므로 쿠키를 임의로 넣어주어야 함
    const cookie = req?.headers?.cookie ?? '';
    axios.defaults.headers.Cookie = '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const {dispatch, sagaTask} = store;

    dispatch(loadMyInfoRequestAction());
    dispatch(loadPostRequestAction({lastId: 0}));
    dispatch(END);

    await sagaTask.toPromise();
    console.log('getServerSideProps end...');
  }
);

export default Home;
