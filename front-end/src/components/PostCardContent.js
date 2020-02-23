import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({postContent}) => {
  return (
    <div>
      {postContent.split(/(#[^\s]+)/g).map(v => {
        if (v.match(/#[^\s]+/)) {
          return (
            <Link
              href={{pathname: '/hashtag', query: {tag: v.slice(1)}}}
              as={`/hashtags/${v.slice(1)}`}
              key={v}
            >
              <a href="true">{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired
};

export default PostCardContent;
