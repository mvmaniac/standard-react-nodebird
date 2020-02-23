import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {LOAD_HASHTAG_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({tag}) => {
  const dispatch = useDispatch();
  const {mainPosts} = useSelector(state => state.postReducer);

  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: {tag}
    });
  }, [tag]);

  return (
    <div>
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired
};

// _app.js에서 NodeBird.getInitialProps에서 가져온 ctx 값이 넘어옴
Hashtag.getInitialProps = async context => {
  console.log('hashtag getInitialProps: %s', context.query.tag);
  return {tag: context.query.tag};
};

export default Hashtag;
