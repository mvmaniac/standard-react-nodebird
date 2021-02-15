import React from 'react';
import {useSelector} from 'react-redux';
import Head from 'next/head';
import {END} from 'redux-saga';
import {Avatar, Card} from 'antd';

import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import {loadUserInfoRequestAction} from '../reducers/user';

const Profile = () => {
  const other = useSelector((state) => state.user.other);

  return (
    <AppLayout>
      <Head>
        <title>{other.nickname}님의 정보 | NodeBird</title>
      </Head>
      {other ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {other.posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {other.followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {other.followers}
            </div>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{other.nickname[0]}</Avatar>}
            title={other.nickname}
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

// 접속할때 마다 정보가 바뀌지 않는 것들, 빈번하게 안바뀌는 것들
// 블로그 게시글 같은거...?
export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
  console.log('getStaticProps start...');

  const {dispatch, sagaTask} = store;

  dispatch(loadUserInfoRequestAction({userId: 1}));
  dispatch(END);

  await sagaTask.toPromise();
  console.log('getStaticProps end...');
});

export default Profile;
