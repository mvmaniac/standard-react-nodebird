import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Input} from 'antd';
import styled from 'styled-components';

import {addPost} from '../reducers/post';

const FormStyled = styled(Form)`
  margin: 10px 0 20px;

  .btn-submit {
    float: right;
  }

  .image {
    display: inline-block;
  }

  .image > img {
    width: 200px;
  }
`;

const PostForm = () => {
  const {imagePaths, postAdded} = useSelector((state) => state.post);
  const [text, setText] = useState('');
  const imageInput = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (postAdded) {
      setText('');
    }
  }, [postAdded]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
  }, [dispatch]);

  return (
    <FormStyled encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" htmlType="submit" className="btn-submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} className="image">
            <img
              src={`http://localhost:3000/${v}`}
              style={{width: '200px'}}
              alt={v}
            />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </FormStyled>
  );
};

export default PostForm;
