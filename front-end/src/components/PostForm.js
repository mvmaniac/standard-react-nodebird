import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Form, Input, Button} from 'antd';
import {ADD_POST_REQUEST} from '../reducers/post';

const PostForm = () => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const {imagePaths, isAddingPost, isAddedPost} = useSelector(state => state.postReducer);

  useEffect(() => {
    setContent('');
  }, [isAddedPost === true]);

  const onSubmitForm = useCallback(evt => {
    evt.preventDefault();

    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content
      }
    });
  }, []);

  const onChangeContent = useCallback(evt => {
    setContent(evt.target.value);
  }, []);

  return (
    <Form encType="mulipart/form-data" style={{margin: '10px 0 20px'}} onSubmit={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder="무슨 일이 있었던가?"
        value={content}
        onChange={onChangeContent}
      />
      <div>
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" htmlType="submit" style={{float: 'right'}} loading={isAddingPost}>
          짹쨱
        </Button>
      </div>
      <div>
        {imagePaths.map((imagPath, idx) => {
          return (
            <div key={`${idx + 1}`} style={{display: 'inline-block'}}>
              <img
                src={`http//localhost:3065/${imagPath}`}
                style={{width: '200px'}}
                alt={imagPath}
              />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
