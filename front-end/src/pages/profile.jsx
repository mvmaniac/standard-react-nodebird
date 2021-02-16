import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {END} from 'redux-saga';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';

import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  loadFollowersRequestAction,
  loadFollowingRequestAction,
  loadMyInfoRequestAction
} from '../reducers/user';

const Profile = () => {
  const my = useSelector((state) => state.user.my);

  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인한 정보가 없다면 메인으로 이동
    if (!my?.id) {
      Router.push('/');
    }
  }, [my?.id]);

  useEffect(() => {
    dispatch(loadFollowingRequestAction());
    dispatch(loadFollowersRequestAction());
  }, [dispatch]);

  if (!my) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={my.followings} />
        <FollowList header="팔로워 목록" data={my.followers} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({store, req}) => {
    console.log('getServerSideProps start...');

    // 프론트 서버에서 수행하므로 쿠키를 임의로 넣어주어야 함
    const cookie = req?.headers?.cookie ?? '';
    axios.defaults.headers.Cookie = '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const {dispatch, sagaTask} = store;

    dispatch(loadMyInfoRequestAction());
    dispatch(END);

    await sagaTask.toPromise();
    console.log('getServerSideProps end...');
  }
);

export default Profile;
