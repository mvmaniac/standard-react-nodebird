import React from 'react';
import Link from 'next/link'
import {Menu, Input, Button} from 'antd';

const AppLayout = ({children}) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/"><a href="true">노드버드</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/profile"><a href="true">프로필</a></Link></Menu.Item>
        <Menu.Item key="search">
          <Input.Search style={{verticalAlign: 'middle'}} enterButton />
        </Menu.Item>
      </Menu>
      <Link href="/sign-up"><Button>회원가입</Button></Link>
      {children}
    </div>
  );
};

export default AppLayout;
