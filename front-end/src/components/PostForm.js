import React from 'react';
import {Form, Input, Button} from 'antd';
import PropTypes from 'prop-types';

const PostForm = ({imagePaths}) => {
  return (
    <Form encType="mulipart/form-data" style={{margin: '10px 0 20px'}}>
      <Input.TextArea maxLength={140} placeholder="무슨 일이 있었던가?" />
      <div>
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" htmlType="submit" style={{float: 'right'}}>
          짹쨱
        </Button>
      </div>
      <div>
        {imagePaths.map((imagPath, idx) => {
          return (
            <div key={`${idx + 1}`} style={{display: 'inline-block'}}>
              <img src={`http//localhost:3065/${imagPath}`} style={{width: '200px'}} alt={imagPath} />
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

PostForm.propTypes = {
  imagePaths: PropTypes.arrayOf.isRequired
};

export default PostForm;
