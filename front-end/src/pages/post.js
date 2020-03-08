import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Helmet from 'react-helmet';

import {FRONT_END_URL, BACK_END_URL, IMAGE_URL} from '../config/config';
import {LOAD_POST_REQUEST} from '../reducers/post';

function Post ({postId}) {
  const {singlePost} = useSelector(state => state.postReducer);

  return (
    <>
      <Helmet
        title={`${singlePost.user.nickname}`}
        meta={[
          {name: 'description', content: singlePost.content},
          {property: 'og:title', content: `${singlePost.user.nickname}님의 게시글`},
          {property: 'og:description', content: singlePost.content},
          {
            property: 'og:image',
            content: singlePost.images[0] ? `${IMAGE_URL}${singlePost.images[0].src}` : `${FRONT_END_URL}/favicon.ico`
          },
          {property: 'og:url', content: `${FRONT_END_URL}/post/${postId}`}
        ]}
      />
      <div>{postId}</div>
      <div>{singlePost.content}</div>
      <div>{singlePost.user.nickname}</div>
      <div>
        {singlePost.images.length && (
          <img src={`${BACK_END_URL}/${singlePost.images[0].src}`} alt="" />
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
