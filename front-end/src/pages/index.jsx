import React, {useEffect} from 'react'; // next.js 에서는 react를 import 안해도 실행 가능 함...
import {useDispatch, useSelector} from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {loadPostRequestAction} from '../reducers/post';

const Home = () => {
  const my = useSelector((state) => state.user.my);
  const {mainPosts, hasMorePost, isLoadPostLoading} = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostRequestAction());
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

      const {scrollY} = window;
      const {clientHeight, scrollHeight} = document.documentElement;

      if (
        scrollY + clientHeight > scrollHeight - 300 &&
        hasMorePost &&
        !isLoadPostLoading
      ) {
        dispatch(loadPostRequestAction());
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, hasMorePost, isLoadPostLoading]);

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
