import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import {LOAD_HASHTAG_POSTS_REQUEST, LOAD_MAIN_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../containers/PostCard';

const Hashtag = ({tag}) => {
  const {mainPosts, hasMorePost} = useSelector(state => state.postReducer);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    // console.log(
    //   window.scrollY,
    //   document.documentElement.clientHeight,
    //   document.documentElement.scrollHeight
    // );
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost && mainPosts.length) {
        const lastId = mainPosts[mainPosts.length - 1].id;

        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            data: {lastId, tag}
          });
        }

        countRef.current.push(lastId);
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

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
  const {tag} = context.query;

  console.log('hashtag getInitialProps: %s', tag);

  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: {tag}
  });

  return {tag};
};

export default Hashtag;
