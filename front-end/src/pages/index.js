import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: 'dev'
      },
      content: '테스트 게시글',
      img: 'https://i.pinimg.com/236x/cb/05/a9/cb05a9630a545502d2be98d25d3a3c0c.jpg'
    }
  ]
};

// 리액트 컴포넌트 분리 기준은 단순하게
// 리액트 조건문과 반복문 안에 들어가는 컴포넌트를 분리
// 또는 Form 처럼 state 가 들어가있는 컴포넌트
const Home = () => {
  return (
    <div>
      {dummy.isLoggedIn && <PostForm imagePaths={dummy.imagePaths} />}
      {dummy.mainPosts.map(post => {
        return <PostCard key={post} post={post} />;
      })}
    </div>
  );
};

export default Home;
