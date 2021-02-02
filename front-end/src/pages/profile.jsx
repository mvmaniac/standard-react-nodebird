import React from 'react';
import Head from 'next/head';
import {useSelector} from 'react-redux';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const my = useSelector((state) => state.user.my);

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
