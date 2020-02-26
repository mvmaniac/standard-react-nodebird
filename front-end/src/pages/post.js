import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {LOAD_POST_REQUEST} from '../reducers/post';

function Post ({postId}) {
  const {singlePost} = useSelector(state => state.postReducer);

  return (
    <>
      <div>{postId}</div>
      <div>{singlePost.content}</div>
      <div>{singlePost.user.nickname}</div>
      <div>
        {singlePost.images.length && (
          <img src={`http://localhost:3065/${singlePost.images[0].src}`} alt="" />
        )}
      </div>
    </>
  );
}

Post.propTypes = {
  postId: PropTypes.number.isRequired
};

Post.getInitialProps = async context => {
  const {postId} = context.query;

  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: {postId}
  });

  return {postId: parseInt(postId, 10)};
};

export default Post;
