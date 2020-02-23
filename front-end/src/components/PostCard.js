import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {Button, Card, Icon, Avatar, Input, Form, List, Comment} from 'antd';
import {useSelector, useDispatch} from 'react-redux';

import {
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  RETWEET_REQUEST
} from '../reducers/post';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import PostCardFollow from './PostCardFollow';

const PostCard = ({post}) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState('');

  const {me} = useSelector(state => state.userReducer);
  const {isAddingComment, isAddedComment} = useSelector(state => state.postReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    setCommentText('');
  }, [isAddedComment === true]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);

    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: {postId: post.id}
      });
    }
  }, []);

  const onSubmitCommentForm = useCallback(
    evt => {
      evt.preventDefault();

      if (!me) {
        alert('로그인이 필요합니다');
        return;
      }

      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          content: commentText
        }
      });
    },
    [me && me.id, commentText]
  );

  const onChangeComment = useCallback(evt => {
    setCommentText(evt.target.value);
  }, []);

  const isLiked = me && post.likers && post.likers.find(liker => liker.id === me.id);

  const onToggleLike = useCallback(() => {
    if (!me) {
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
  }, [me && me.id, post && post.id, isLiked]);

  const onRetweet = useCallback(() => {
    if (!me) {
      alert('로그인이 필요합니다');
    }

    dispatch({
      type: RETWEET_REQUEST,
      data: {
        postId: post.id
      }
    });
  }, [me && me.id, post && post.id]);

  return (
    <div>
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
          <Icon key="ellipsis" type="ellipsis" />
        ]}
        title={post.retweet ? `${post.user.nickname}님이 리트윗 하셨습니다.` : null}
        extra={
          !me || post.user.id === me.id ? null : (
            <PostCardFollow postUserId={post.user.id} followings={me.followings} />
          )
        }
      >
        {post.retweetId && post.retweet ? (
          <Card cover={post.retweet.images && <PostImages images={post.retweet.images} />}>
            <Card.Meta
              // next의 페이지를 사용하기 위해(?)
              avatar={(
                <Link
                  href={{pathname: '/user', query: {id: post.retweet.user.id}}}
                  as={`/users/${post.retweet.user.id}`}
                >
                  <a href="true">
                    <Avatar>{post.retweet.user.nickname[0]}</Avatar>
                  </a>
                </Link>
              )}
              title={post.retweet.user.nickname}
              description={<PostCardContent postContent={post.retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            // next의 페이지를 사용하기 위해(?)
            avatar={(
              <Link
                href={{pathname: '/user', query: {id: post.user.id}}}
                as={`/users/${post.user.id}`}
              >
                <a href="true">
                  <Avatar>{post.user.nickname[0]}</Avatar>
                </a>
              </Link>
            )}
            title={post.user.nickname}
            description={<PostCardContent postContent={post.content} />}
          />
        )}
      </Card>

      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitCommentForm}>
            <Form.Item>
              <Input.TextArea row={4} value={commentText} onChange={onChangeComment} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>
              삐약
            </Button>
          </Form>
          <List
            header={`${post.comments ? post.comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.user.nickname}
                  avatar={(
                    <Link
                      href={{pathname: '/user', query: {id: item.user.id}}}
                      as={`/users/${item.user.id}`}
                    >
                      <a href="true">
                        <Avatar>{item.user.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  )}
                  content={item.content}
                  datetime={item.createdAt}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

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
