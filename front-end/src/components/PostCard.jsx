import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import FollowButton from './FollowButton';
import {
  likePostRequestAction,
  removePostRequestAction,
  unLikePostRequestAction
} from '../reducers/post';

const CardStyled = styled(Card)`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const PostCard = ({post}) => {
  const {user: postUser, likers} = post;

  const myId = useSelector((state) => state.user.my?.id);
  const isRemovePostLoading = useSelector(
    (state) => state.post.isRemovePostLoading
  );

  const [isCommentOpened, setIsCommentOpened] = useState(false);

  const dispatch = useDispatch();

  const onLike = useCallback(() => {
    dispatch(likePostRequestAction({postId: post.id}));
  }, [dispatch, post.id]);

  const onUnLike = useCallback(() => {
    dispatch(unLikePostRequestAction({postId: post.id}));
  }, [dispatch, post.id]);

  const onToggleComment = useCallback(() => {
    setIsCommentOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePostRequestAction({postId: post.id}));
  }, [dispatch, post]);

  const isLike = likers.find((value) => value.id === myId);
  const isShowFollow = post.user.id !== myId;

  return (
    <>
      <CardStyled
        cover={post.images[0] && <PostImages images={post.images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          isLike ? (
            <HeartTwoTone
              key="heart"
              onClick={onUnLike}
              twoToneColor="#eb2f96"
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {myId && myId === postUser.id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={isRemovePostLoading}
                    >
                      삭제
                    </Button>
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
        extra={myId && isShowFollow && <FollowButton post={post} />}
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
    comments: PropTypes.arrayOf(PropTypes.object),
    likers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number
      })
    )
  }).isRequired
};

export default PostCard;
