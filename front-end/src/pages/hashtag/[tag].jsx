import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {END} from 'redux-saga';
import {Button, Result} from 'antd';

import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import {loadMyInfoRequestAction} from '../../reducers/user';
import {loadPostByHashtagRequestAction} from '../../reducers/post';

const Hashtag = () => {
  const router = useRouter();
  const {tag} = router.query;

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
          loadPostByHashtagRequestAction({
            lastId,
            hashtag: tag
          })
        );
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, hasMorePost, isLoadPostLoading, mainPosts, tag]);

  const onGoHome = () => {
    Router.push('/');
  };

  return (
    <AppLayout tag={tag}>
      {mainPosts?.length ? (
        mainPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <Result
          title={`"${tag}"에 대한 검색 결과가 없습니다.`}
          extra={
            <Button type="primary" key="home" onClick={onGoHome}>
              노드버드 홈
            </Button>
          }
        />
      )}
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
    const {tag} = params;

    dispatch(loadMyInfoRequestAction());
    dispatch(loadPostByHashtagRequestAction({hashtag: tag}));
    dispatch(END);

    await sagaTask.toPromise();
  }
);

export default Hashtag;
