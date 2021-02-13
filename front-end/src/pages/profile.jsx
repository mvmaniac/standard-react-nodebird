import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  loadFollowersRequestAction,
  loadFollowingRequestAction
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

export default Profile;
