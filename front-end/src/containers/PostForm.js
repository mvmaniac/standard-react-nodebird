import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Form, Input, Button} from 'antd';

import {ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE} from '../reducers/post';

const PostForm = () => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const {imagePaths, isAddingPost, isAddedPost} = useSelector(state => state.postReducer);

  const imageInput = useRef();

  useEffect(() => {
    setContent('');
  }, [isAddedPost === true]);

  const onSubmitForm = useCallback(
    evt => {
      evt.preventDefault();

      if (!content || !content.trim()) {
        alert('게시글을 작성하세요.');
        return;
      }

      const formData = new FormData();

      imagePaths.forEach(i => {
        formData.append('image', i);
      });

      formData.append('content', content);

      dispatch({
        type: ADD_POST_REQUEST,
        data: formData
      });
    },
    [content, imagePaths]
  );

  const onChangeContent = useCallback(evt => {
    setContent(evt.target.value);
  }, []);

  const onChangeImage = useCallback(evt => {
    console.log(evt.target.files);

    const imageFormData = new FormData();

    [].forEach.call(evt.target.files, file => {
      imageFormData.append('images', file);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: {index}
      });
    },
    []
  );

  return (
    <Form encType="multipart/form-data" style={{margin: '10px 0 20px'}} onSubmit={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder="무슨 일이 있었던가?"
        value={content}
        onChange={onChangeContent}
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImage} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" htmlType="submit" style={{float: 'right'}} loading={isAddingPost}>
          짹쨱
        </Button>
      </div>
      <div>
        {imagePaths.map((imagPath, idx) => {
          return (
            <div key={`${idx + 1}`} style={{display: 'inline-block'}}>
              <img
                src={`http://localhost:3065/${imagPath}`}
                style={{width: '200px'}}
                alt={imagPath}
              />
              <div>
                <Button onClick={onRemoveImage(idx)}>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
