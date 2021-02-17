import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import {Menu, Input, Row, Col} from 'antd';
import styled from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const InputSearchStyled = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({children}) => {
  const my = useSelector((state) => state.user.my);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item>
          <InputSearchStyled
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item hidden={!!my?.id}>
          <Link href="/sign-up">회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          {my?.id ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by ZeroCho
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppLayout;
