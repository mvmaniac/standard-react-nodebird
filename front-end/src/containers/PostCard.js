import React, {useState, useCallback, memo} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Button, Card, Icon, Avatar, List, Comment, Popover} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import {
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST
} from '../reducers/post';
import PostImages from '../components/PostImages';
import PostCardContent from '../components/PostCardContent';
import CommentForm from './CommentForm';
import FollowButton from '../components/FollowButton';

const CardWrapper = styled.div`
  margin-top: 20px;

  &:nth-child(1) {
    margin-top: 10px;
  }
`;

const PostCard = memo(({post}) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const meId = useSelector(
    state => state.userReducer.me && state.userReducer.me.id
  );

  const dispatch = useDispatch();

  const isLiked =
    meId && post.likers && post.likers.find(liker => liker.id === meId);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);

    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: {postId: post.id}
      });
    }
  }, []);

  const onToggleLike = useCallback(() => {
    if (!meId) {
      alert('로그인이 필요합니다');
      return;
    }

    if (isLiked) {
      // 좋아요 누른 상태
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: {
          postId: post.id
        }
      });
    } else {
      // 좋아요 안 누른 상태
      dispatch({
        type: LIKE_POST_REQUEST,
        data: {
          postId: post.id
        }
      });
    }
  }, [meId, post && post.id, isLiked]);

  const onRetweet = useCallback(() => {
    if (!meId) {
      alert('로그인이 필요합니다');
    }

    dispatch({
      type: RETWEET_REQUEST,
      data: {
        postId: post.id
      }
    });
  }, [meId, post && post.id]);

  const onRemovePost = useCallback(
    postId => () => {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: {postId}
      });
    },
    []
  );

  return (
    <CardWrapper>
      <Card
        cover={post.images.length && <PostImages images={post.images} />}
        actions={[
          <Icon key="retweet" type="retweet" onClick={onRetweet} />,
          <Icon
            key="heart"
            type="heart"
            theme={isLiked ? 'twoTone' : 'outlined'}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
          />,
          <Icon key="message" type="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {meId && post.user.id === meId ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost(post.id)}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <Icon type="ellipsis" />
          </Popover>
        ]}
        title={
          post.retweet ? `${post.user.nickname}님이 리트윗 하셨습니다.` : null
        }
        extra={<FollowButton post={post} />}
      >
        {post.retweetId && post.retweet ? (
          <Card
            cover={
              post.retweet.images.length && (
                <PostImages images={post.retweet.images} />
              )
            }
          >
            <Card.Meta
              // next의 페이지를 사용하기 위해(?)
              avatar={
                <Link
                  href={{
                    pathname: '/user',
                    query: {userId: post.retweet.user.id}
                  }}
                  as={`/users/${post.retweet.user.id}`}
                >
                  <a href="true">
                    <Avatar>{post.retweet.user.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.retweet.user.nickname}
              description={
                <PostCardContent postContent={post.retweet.content} />
              }
            />
          </Card>
        ) : (
          <Card.Meta
            // next의 페이지를 사용하기 위해(?)
            avatar={
              <Link
                href={{pathname: '/user', query: {userId: post.user.id}}}
                as={`/users/${post.user.id}`}
              >
                <a href="true">
                  <Avatar>{post.user.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={post.user.nickname}
            description={<PostCardContent postContent={post.content} />}
          />
        )}
      </Card>

      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.comments ? post.comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.user.nickname}
                  avatar={
                    <Link
                      href={{pathname: '/user', query: {userId: item.user.id}}}
                      as={`/users/${item.user.id}`}
                    >
                      <a href="true">
                        <Avatar>{item.user.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                  datetime={item.createdAt}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
});

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    likers: PropTypes.arrayOf(PropTypes.object),
    retweetId: PropTypes.number,
    retweet: PropTypes.object
  }).isRequired
};

export default PostCard;
