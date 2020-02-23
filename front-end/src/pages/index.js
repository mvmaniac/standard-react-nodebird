import React from 'react';
import {useSelector} from 'react-redux';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import {LOAD_MAIN_POSTS_REQUEST} from '../reducers/post';

// 리액트 컴포넌트 분리 기준은 단순하게
// 리액트 조건문과 반복문 안에 들어가는 컴포넌트를 분리
// 또는 Form 처럼 state 가 들어가있는 컴포넌트
const Home = () => {
  // state 변경 시 리랜더링 때문에 아래처럼 최대한 잘게 쪼개서 가져올 필요가 있을 수 있음
  // const me = useSelector(state => state.userReducer.me);
  // const user = useSelector(state => state.userReducer.user);
  const {me} = useSelector(state => state.userReducer);
  const {mainPosts} = useSelector(state => state.postReducer);

  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map(post => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
};

Home.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST
  });
};

export default Home;
