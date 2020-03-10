import React, {useState, useCallback} from 'react';
import {Button, Form, Input, Row, Col} from 'antd';
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
      style={{
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '15px'
      }}
      onSubmit={onEditNickname}
    >
      <Row>
        <Col span={18}>
          <Input
            addonBefore="별칭"
            value={editedName || (me && me.nickname)}
            onChange={onChangeNickname}
            style={{width: '100% !important'}}
          />
        </Col>
        <Col span={6} style={{paddingLeft: '5px'}}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isEditingNickname}
            title="수정"
          >
            수정
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default NicknameForm;
