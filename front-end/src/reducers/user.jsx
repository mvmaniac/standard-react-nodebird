import {produce} from 'immer';
// import faker from 'faker';

// const dummyUser = (data) => ({
//   ...data,
//   id: 1,
//   email: faker.internet.email(),
//   nickname: faker.internet.userName(),
//   posts: [{id: 1}],
//   followings: [
//     {nickname: faker.internet.userName()},
//     {nickname: faker.internet.userName()},
//     {nickname: faker.internet.userName()}
//   ],
//   followers: [
//     {nickname: faker.internet.userName()},
//     {nickname: faker.internet.userName()},
//     {nickname: faker.internet.userName()}
//   ]
// });

export const initialState = {
  isLoginLoading: false, // 로그인 시도 중
  isLoginDone: false,
  loginError: null,

  isLogoutLoading: false, // 로그아웃 시도 중
  isLogoutDone: false,
  logoutError: null,

  isSignUpLoading: false, // 회원가입 시도 중
  isSignUpDone: false,
  signUpError: null,

  isLoadMyInfoLoading: false, // 내 정보 불러오기 시도 중
  isLoadMyInfoDone: false,
  loadMyInfoError: false,

  isChangeNicknameLoading: false, // 닉네임 변경 시도 중
  isChangeNicknameDone: false,
  changeNicknameError: null,

  isLoadFollowingsLoading: false, // 팔로잉 목록 불러오기 시도 중
  isLoadFollowingsDone: false,
  loadFollowingsError: false,

  isLoadFollowersLoading: false, // 팔로워 목록 불러오기 시도 중
  isLoadFollowersDone: false,
  loadFollowersError: false,

  isFollowLoading: false, // 팔로우 시도 중
  isFollowDone: false,
  followError: false,

  isUnFollowLoading: false, // 언팔로우 시도 중
  isUnFollowDone: false,
  unFollowError: false,

  my: null,
  signUpData: {},
  loginData: {}
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_IN_ERROR_CLEAR = 'LOG_IN_ERROR_CLEAR';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_COMPLETE = 'SIGN_UP_COMPLETE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const LOAD_FOLLOWING_REQUEST = 'LOAD_FOLLOWING_REQUEST';
export const LOAD_FOLLOWING_SUCCESS = 'LOAD_FOLLOWING_SUCCESS';
export const LOAD_FOLLOWING_FAILURE = 'LOAD_FOLLOWING_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UN_FOLLOW_REQUEST = 'UN_FOLLOW_REQUEST';
export const UN_FOLLOW_SUCCESS = 'UN_FOLLOW_SUCCESS';
export const UN_FOLLOW_FAILURE = 'UN_FOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const signUpRequestAction = (data) => ({
  type: SIGN_UP_REQUEST,
  data
});

export const signUpCompleteAction = () => ({
  type: SIGN_UP_COMPLETE
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data
});

export const loginErrorClearAction = () => ({
  type: LOG_IN_ERROR_CLEAR
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST
});

export const loadMyInfoRequestAction = () => ({
  type: LOAD_MY_INFO_REQUEST
});

export const changeNicknameRequestAction = (data) => ({
  type: CHANGE_NICKNAME_REQUEST,
  data
});

export const loadFollowingRequestAction = () => ({
  type: LOAD_FOLLOWING_REQUEST
});

export const loadFollowersRequestAction = () => ({
  type: LOAD_FOLLOWERS_REQUEST
});

export const followRequestAction = (data) => ({
  type: FOLLOW_REQUEST,
  data
});

export const unFollowRequestAction = (data) => ({
  type: UN_FOLLOW_REQUEST,
  data
});

export const removeFollowerRequestAction = (data) => ({
  type: REMOVE_FOLLOWER_REQUEST,
  data
});

const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoginLoading = true;
        draft.isLoginDone = false;
        draft.loginError = null;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoginLoading = false;
        draft.isLoginDone = true;
        draft.my = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoginLoading = false;
        draft.loginError = action.error;
        break;
      }
      case LOG_IN_ERROR_CLEAR: {
        draft.loginError = null;
        break;
      }

      case LOG_OUT_REQUEST: {
        draft.isLogoutLoading = true;
        draft.isLogoutDone = false;
        draft.logoutError = null;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLogoutLoading = false;
        draft.isLogoutDone = true;
        draft.my = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLogoutLoading = false;
        draft.logoutError = action.error;
        break;
      }

      case SIGN_UP_REQUEST: {
        draft.isSignUpLoading = true;
        draft.isSignUpDone = false;
        draft.signUpError = null;
        draft.signUpData = action.data;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSignUpLoading = false;
        draft.isSignUpDone = true;
        draft.signUpData = action.data;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSignUpLoading = false;
        draft.signUpError = action.error;
        break;
      }
      case SIGN_UP_COMPLETE: {
        draft.isSignUpDone = false;
        draft.signUpData = null;
        break;
      }

      case LOAD_MY_INFO_REQUEST: {
        draft.isLoadMyInfoLoading = true;
        draft.isLoadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      }
      case LOAD_MY_INFO_SUCCESS: {
        draft.isLoadMyInfoLoading = false;
        draft.isLoadMyInfoDone = true;
        draft.my = action.data;
        break;
      }
      case LOAD_MY_INFO_FAILURE: {
        draft.isLoadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      }

      case CHANGE_NICKNAME_REQUEST: {
        draft.isChangeNicknameLoading = true;
        draft.isChangeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      }
      case CHANGE_NICKNAME_SUCCESS: {
        draft.isChangeNicknameLoading = false;
        draft.isChangeNicknameDone = true;
        draft.my.nickname = action.data.nickname;
        break;
      }
      case CHANGE_NICKNAME_FAILURE: {
        draft.isChangeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      }

      case LOAD_FOLLOWING_REQUEST: {
        draft.isLoadFollowingLoading = true;
        draft.isLoadFollowingDone = false;
        draft.loadFollowingError = null;
        break;
      }
      case LOAD_FOLLOWING_SUCCESS: {
        draft.isLoadFollowingLoading = false;
        draft.isLoadFollowingDone = true;
        draft.my.followings = action.data.followings;
        break;
      }
      case LOAD_FOLLOWING_FAILURE: {
        draft.isLoadFollowingLoading = false;
        draft.loadFollowingError = action.error;
        break;
      }

      case LOAD_FOLLOWERS_REQUEST: {
        draft.isLoadFollowersLoading = true;
        draft.isLoadFollowersDone = false;
        draft.loadFollowersError = null;
        break;
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        draft.isLoadFollowersLoading = false;
        draft.isLoadFollowersDone = true;
        draft.my.followers = action.data.followers;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE: {
        draft.isLoadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;
      }

      case FOLLOW_REQUEST: {
        draft.isFollowLoading = true;
        draft.isFollowDone = false;
        draft.followError = null;
        break;
      }
      case FOLLOW_SUCCESS: {
        draft.isFollowLoading = false;
        draft.isFollowDone = true;
        draft.my.followings.push({id: action.data.followingId});
        break;
      }
      case FOLLOW_FAILURE: {
        draft.isFollowLoading = false;
        draft.followError = action.error;
        break;
      }

      case UN_FOLLOW_REQUEST: {
        draft.isUnFollowLoading = true;
        draft.isUnFollowDone = false;
        draft.unFollowError = null;
        break;
      }
      case UN_FOLLOW_SUCCESS: {
        draft.isUnFollowLoading = false;
        draft.isUnFollowDone = true;
        draft.my.followings = draft.my.followings.filter(
          (follow) => follow.id !== action.data.followingId
        );
        break;
      }
      case UN_FOLLOW_FAILURE: {
        draft.isUnFollowLoading = false;
        draft.unFollowError = action.error;
        break;
      }

      case REMOVE_FOLLOWER_REQUEST: {
        draft.isRemoveFollowerLoading = true;
        draft.isRemoveFollowerDone = false;
        draft.removeFollowerError = null;
        break;
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        draft.isRemoveFollowerLoading = false;
        draft.isRemoveFollowerDone = true;
        draft.my.followers = draft.my.followers.filter(
          (follow) => follow.id !== action.data.followerId
        );
        break;
      }
      case REMOVE_FOLLOWER_FAILURE: {
        draft.isRemoveFollowerLoading = false;
        draft.removeFollowerError = action.error;
        break;
      }

      case ADD_POST_TO_ME: {
        draft.my.posts.unshift({id: action.data});

        // return {
        //   ...state,
        //   my: {
        //     ...state.my,
        //     posts: , ...state.my.posts]
        //   }
        // };
        break;
      }

      case REMOVE_POST_OF_ME: {
        draft.my.posts = draft.my.posts.filter(
          (value) => value.id !== action.data.postId
        );

        // return {
        //   ...state,
        //   my: {
        //     ...state.my,
        //     posts: state.my.posts.filter((value) => value.id !== action.data)
        //   }
        // };
        break;
      }

      default:
    }
  });

export default userReducer;
