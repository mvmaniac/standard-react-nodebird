import React from 'react';
import {useSelector} from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Col, Input, Menu, Row} from 'antd';

import LoginForm from './LoginForm';
import UserPofile from './UserPofile';

const AppLayout = ({children}) => {
  const {isLoggedIn} = useSelector(state => state.userReducer);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a href="true">노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a href="true">프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Input.Search style={{verticalAlign: 'middle'}} enterButton />
        </Menu.Item>
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserPofile /> : <LoginForm />}
        </Col>

        <Col xs={24} md={12}>
          {children}
        </Col>

        <Col xs={24} md={6} />
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppLayout;
