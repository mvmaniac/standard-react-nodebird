import React, {useEffect} from 'react'; // next.js 에서는 react를 import 안해도 실행 가능 함...
import {useDispatch, useSelector} from 'react-redux';

import {Modal} from 'antd';
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
    dispatch(loadMyInfoRequestAction());
    dispatch(loadPostRequestAction({lastId: 0}));
  }, [dispatch]);

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
export default Home;
