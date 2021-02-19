import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import {Button, Card, Popover, Avatar, List, Comment, Modal} from 'antd';
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
  retweetRequestAction,
  unLikePostRequestAction
} from '../reducers/post';
import dayjs from '../utils/dayjs';

const CardStyled = styled(Card)`
  &:not(:first-child) {
    margin-top: 20px;
  }

  div.date {
    float: right;
  }
`;

const AvatarStyled = styled(Avatar)`
  cursor: pointer;
`;

const PostCard = ({post}) => {
  const {user: postUser, likers} = post;

  const myId = useSelector((state) => state.user.my?.id);
  const isRemovePostLoading = useSelector(
    (state) => state.post.isRemovePostLoading
  );

  const [isCommentOpened, setIsCommentOpened] = useState(false);

  const dispatch = useDispatch();

  const onRetweet = useCallback(() => {
    if (!myId) {
      Modal.warning({
        title: '알림',
        content: '로그인이 필요합니다.'
      });
    }

    dispatch(retweetRequestAction({postId: post.id}));
  }, [dispatch, myId, post.id]);

  const onLike = useCallback(() => {
    if (!myId) {
      Modal.warning({
        title: '알림',
        content: '로그인이 필요합니다.'
      });
    }

    dispatch(likePostRequestAction({postId: post.id}));
  }, [dispatch, myId, post.id]);

  const onUnLike = useCallback(() => {
    if (!myId) {
      Modal.warning({
        title: '알림',
        content: '로그인이 필요합니다.'
      });
    }

    dispatch(unLikePostRequestAction({postId: post.id}));
  }, [dispatch, myId, post.id]);

  const onToggleComment = useCallback(() => {
    setIsCommentOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!myId) {
      Modal.warning({
        title: '알림',
        content: '로그인이 필요합니다.'
      });
    }

    dispatch(removePostRequestAction({postId: post.id}));
  }, [dispatch, myId, post.id]);

  const isLike = likers.find((value) => value.id === myId);
  const isShowFollow = post.user.id !== myId;

  return (
    <>
      <CardStyled
        cover={post.images[0] && <PostImages images={post.images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
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
        title={
          post.retweetId ? `${post.user.nickname}님이 리트윗 하셨습니다.` : ''
        }
        extra={myId && isShowFollow && <FollowButton post={post} />}
      >
        {post.retweetId && post.retweet ? (
          <Card
            cover={
              post.retweet.images[0] && (
                <PostImages images={post.retweet.images} />
              )
            }
          >
            <div className="date">{dayjs(post.createdAt).fromNow()}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.retweet.user.id}`}>
                  <AvatarStyled>{post.retweet.user.nickname[0]}</AvatarStyled>
                </Link>
              }
              title={post.retweet.user.nickname}
              description={<PostCardContent postData={post.retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div className="date">{dayjs(post.createdAt).fromNow()}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.user.id}`}>
                  <AvatarStyled>{postUser.nickname[0]}</AvatarStyled>
                </Link>
              }
              title={postUser.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
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
    ),
    retweetId: PropTypes.number,
    retweet: PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.shape({
        id: PropTypes.number,
        nickname: PropTypes.string
      }),
      content: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.object)
    }),
    retweetError: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired
};

export default PostCard;
