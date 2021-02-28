import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {END} from 'redux-saga';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import useSWR from 'swr';
import {Modal} from 'antd';

import {API_URL} from '../config/config';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {loadMyInfoRequestAction} from '../reducers/user';

const fetcher = (url) =>
  axios.get(url, {withCredentials: true}).then((result) => result.data);

const Profile = () => {
  const my = useSelector((state) => state.user.my);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);

  const {data: {followings} = {data: {}}, error: followingError} = useSWR(
    `${API_URL}/users/followings?limit=${followingsLimit}`,
    fetcher
  );

  const {data: {followers} = {data: {}}, error: followerError} = useSWR(
    `${API_URL}/users/followers?limit=${followersLimit}`,
    fetcher
  );

  useEffect(() => {
    // 로그인한 정보가 없다면 메인으로 이동
    if (!my?.id) {
      Router.push('/');
    }
  }, [my?.id]);

  // TODO: 숫자가 계속 늘어남
  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  // TODO: 숫자가 계속 늘어남
  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  // useSWR를 사용하므로 dispatch를 사용하지 않음
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadFollowingRequestAction());
  //   dispatch(loadFollowersRequestAction());
  // }, [dispatch]);

  if (!my) {
    return null;
  }

  // return은 hooks가 다 실행되고 마지막쪽에 지정해 주어야 함
  if (followerError || followingError) {
    Modal.error({
      title: '에러',
      content: '팔로잉/팔로워 목록 불러오는 중 에러가 발생했습니다.'
    });
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={followings ?? []}
          onClickMore={loadMoreFollowings}
          loading={!followings && !followingError}
        />
        <FollowList
          header="팔로워 목록"
          data={followers ?? []}
          onClickMore={loadMoreFollowers}
          loading={!followers && !followerError}
        />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({store, req}) => {
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
  }
);

export default Profile;
