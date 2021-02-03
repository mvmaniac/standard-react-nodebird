import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const my = useSelector((state) => state.user.my);

  useEffect(() => {
    // 로그인한 정보가 없다면 메인으로 이동
    console.log(my?.id);

    if (!my?.id) {
      Router.push('/');
    }
  }, [my?.id]);

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
