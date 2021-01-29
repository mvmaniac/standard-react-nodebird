import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({postData}) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((value, index) => {
      if (value.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${value.slice(1)}`} key={`${index + 1}`}>
            {value}
          </Link>
        );
      }
      return value;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired
};

export default PostCardContent;
