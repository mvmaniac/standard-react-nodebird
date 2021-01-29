import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button, Card, Popover, Avatar, List, Comment} from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone
} from '@ant-design/icons';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

const CardStyled = styled(Card)`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const PostCard = ({post}) => {
  const {user: postUser} = post;

  const myId = useSelector((state) => state.user.my?.id);

  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpened, setIsCommentOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setIsCommentOpened((prev) => !prev);
  }, []);

  return (
    <>
      <CardStyled
        cover={post.images[0] && <PostImages images={post.images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          isLiked ? (
            <HeartTwoTone
              key="heart"
              onClick={onToggleLike}
              twoToneColor="#eb2f96"
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {myId && myId === postUser.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{postUser.nickname[0]}</Avatar>}
          title={postUser.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </CardStyled>
      {isCommentOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.comments}
            renderItem={(item) => (
              <List.Item>
                <Comment
                  author={item.user.nickname}
                  avatar={<Avatar>{item.user.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </List.Item>
            )}
          />
        </>
      )}
      {/* <CommentForm/> */}
      {/* <Comments/> */}
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string
    }),
    content: PropTypes.string,
    createdAt: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    comments: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default PostCard;
