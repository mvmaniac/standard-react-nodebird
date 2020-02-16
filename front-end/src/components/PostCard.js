import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {Button, Card, Icon, Avatar, Input, Form, List, Comment} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST} from '../reducers/post';

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
      })
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

  return (
    <div>
      <Card
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon key="retweet" type="retweet" />,
          <Icon key="heart" type="heart" />,
          <Icon key="message" type="message" onClick={onToggleComment} />,
          <Icon key="ellipsis" type="ellipsis" />
        ]}
        extra={<Button>팔로우</Button>}
      >
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
          description={(
            <div>
              {post.content.split(/(#[^\s]+)/g).map(v => {
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
          )}
        />
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
    img: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.array
  }).isRequired
};

export default PostCard;
