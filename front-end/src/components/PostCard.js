import React from 'react';
import {Button, Card, Icon, Avatar} from 'antd';
import PropTypes from 'prop-types';

const PostCard = ({post}) => {
  return (
    <Card
      key={+post.createdAt}
      cover={post.img && <img alt="example" src={post.img} />}
      actions={[
        <Icon key="retweet" type="retweet" />,
        <Icon key="heart" type="heart" />,
        <Icon key="message" type="message" />,
        <Icon key="ellipsis" type="ellipsis" />
      ]}
      extra={<Button>팔로우</Button>}
    >
      <Card.Meta
        avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
        title={post.User.nickname}
        description={post.content}
      />
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object
  }).isRequired
};

export default PostCard;
