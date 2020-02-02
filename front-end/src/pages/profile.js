import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Profile = () => {
  return (
    <>
      <Head>
        <title>NodeBird - Dev</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.css"
        />
      </Head>
      <AppLayout>
        <div>Profile</div>
      </AppLayout>
    </>
  );
};

export default Profile;
