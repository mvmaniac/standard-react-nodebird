import React, {useState, useCallback} from 'react';
import {Button, Form, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';

import {EDIT_NICKNAME_REQUEST} from '../reducers/user';

const NicknameForm = () => {
  const [editedName, setEditedName] = useState('');
  const {me, isEditingNickname} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onChangeNickname = useCallback(evt => {
    setEditedName(evt.target.value);
  }, []);

  const onEditNickname = useCallback(
    evt => {
      evt.preventDefault();
      dispatch({
        type: EDIT_NICKNAME_REQUEST,
        data: {
          nickname: editedName
        }
      });
    },
    [editedName]
  );

  return (
    <Form
      style={{marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}}
      onSubmit={onEditNickname}
    >
      <Input
        addonBefore="별칭"
        value={editedName || (me && me.nickname)}
        onChange={onChangeNickname}
      />
      <Button type="primary" htmlType="submit" loading={isEditingNickname}>
        수정
      </Button>
    </Form>
  );
};

export default NicknameForm;
