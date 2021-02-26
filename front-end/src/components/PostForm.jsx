import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Input, Modal} from 'antd';
import styled from 'styled-components';

import {IMAGE_URL} from '../config/config';
import {
  addPostRequestAction,
  removeImageAction,
  uploadImagesRequestAction
} from '../reducers/post';
import useInput from '../hooks/useInput';

const FormStyled = styled(Form)`
  margin: 0 0 20px;

  div.box-upload {
    display: flex;

    button[type='submit'] {
      margin-left: auto;
    }
  }

  div.box-image {
    .image {
      display: inline-block;

      img {
        width: 200px;
      }
    }
  }
`;

const PostForm = () => {
  const {isAddPostLoading, isAddPostDone, imagePaths} = useSelector(
    (state) => state.post
  );
  const [text, onChangeText, setText] = useInput('');
  const imageInput = useRef();
  const textRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAddPostDone) {
      setText('');
    }
  }, [isAddPostDone, setText]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeImages = useCallback(
    (event) => {
      console.log(event.target.files);

      const formData = new FormData();
      Object.values(event.target.files).forEach((file) => {
        console.log(file);
        formData.append('image', file);
      });

      dispatch(uploadImagesRequestAction(formData));
    },
    [dispatch]
  );

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(removeImageAction({index}));
    },
    [dispatch]
  );

  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) {
      Modal.warning({
        title: '알림',
        content: '게시글을 작성해 주세요.',
        onOk: () => textRef.current.focus()
      });

      return;
    }

    dispatch(
      addPostRequestAction({
        content: text,
        imagePaths
      })
    );
  }, [dispatch, text, imagePaths]);

  return (
    <FormStyled encType="multipart/form-data" onFinish={onSubmitForm}>
      <Form.Item>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder="어떤 신기한 일이 있었나요?"
          ref={textRef}
        />
        <div className="box-upload">
          <input
            type="file"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type="primary" htmlType="submit" loading={isAddPostLoading}>
            짹짹
          </Button>
        </div>
        <div className="box-image">
          {imagePaths.map((value, index) => (
            <div key={value} className="image">
              <img
                src={`${IMAGE_URL}${value.replace(/\/thumb\//, '/origin/')}`}
                style={{width: '200px'}}
                alt={value}
              />
              <div>
                <Button onClick={onRemoveImage(index)}>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </Form.Item>
    </FormStyled>
  );
};

export default PostForm;
