import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Input, Button} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';

const DivStyled = styled.div`
  & {
    white-space: pre-wrap;
  }
`;

const PostCardContent = ({
  postContent,
  isEditMode,
  onUpdatePost,
  onCancelPost
}) => {
  const {isUpdatePostLoading} = useSelector((state) => state.post);

  const [text, onChangeText] = useInput(postContent);
  const textRef = useRef();

  return (
    <DivStyled>
      {isEditMode ? (
        <>
          <Input.TextArea
            value={text}
            onChange={onChangeText}
            ref={textRef}
            rows={4}
          />
          <Button.Group>
            <Button
              onClick={onUpdatePost(text, textRef)}
              loading={isUpdatePostLoading}
            >
              수정
            </Button>
            <Button type="danger" onClick={onCancelPost}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postContent.split(/(#[^\s#]+)/g).map((value, index) => {
          if (value.match(/(#[^\s#]+)/)) {
            return (
              <Link href={`/hashtag/${value.slice(1)}`} key={`${index + 1}`}>
                {value}
              </Link>
            );
          }
          return value;
        })
      )}
    </DivStyled>
  );
};

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
  onUpdatePost: PropTypes.func,
  onCancelPost: PropTypes.func
};

PostCardContent.defaultProps = {
  isEditMode: false,
  onUpdatePost: () => {},
  onCancelPost: () => {}
};

export default PostCardContent;
