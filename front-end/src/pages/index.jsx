import React from 'react'; // next.js 에서는 react를 import 안해도 실행 가능 함...
import {useSelector} from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const my = useSelector((state) => state.user.my);
  const mainPosts = useSelector((state) => state.post.mainPosts);

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
