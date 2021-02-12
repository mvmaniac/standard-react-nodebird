import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Input} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import {changeNicknameRequestAction} from '../reducers/user';

const FormStyled = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  const my = useSelector((state) => state.user.my);
  const isChangeNicknameLoading = useSelector(
    (state) => state.user.isChangeNicknameLoading
  );

  const [nickname, onChangeNickname] = useInput(my?.nickname || '');

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequestAction({nickname}));
  }, [dispatch, nickname]);

  return (
    <FormStyled>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        onChange={onChangeNickname}
        onSearch={onSubmit}
        loading={isChangeNicknameLoading}
        value={nickname}
      />
    </FormStyled>
  );
};

export default NicknameEditForm;
