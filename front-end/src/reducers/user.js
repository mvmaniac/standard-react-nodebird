import produce from 'immer';

// state, action, reducer 는 자주 쓰이므로 export 해주는게 좋음
export const initialState = {
  isLoggingIn: false, // 로그인 시도 중
  isLoggingOut: false, // 로그아웃 시도 중
  loginErrorReason: '', // 로그인 에러 사유
  logoutErrorReason: '', // 로그아웃 에러 사유

  isSigningUp: false, // 회원가입 시도 중
  isSigInUp: false, // 회원가입 성공
  signUpErrorReason: '', // 회원가입 실패 사유

  me: null, // 내 정보
  userInfo: null, // 남의 정보

  followings: [], // 팔로잉 리스트
  followers: [], // 팔로워 리스트,

  isEditingNickname: false, // 별칭 변경 중
  editNicknameErrorReason: '', // 별칭 변경 실패 사유

  hasMoreFollowers: false,
  hasMoreFollowings: false
};

// const dummyUser = {
//   id: 1,
//   nickname: '더미',
//   posts: [],
//   followings: [],
//   followers: [],
//   signUpData: {}
// };

// action (state를 바꾸는 행동)
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UN_FOLLOW_USER_REQUEST = 'UN_FOLLOW_USER_REQUEST';
export const UN_FOLLOW_USER_SUCCESS = 'UN_FOLLOW_USER_SUCCESS';
export const UN_FOLLOW_USER_FAILURE = 'UN_FOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const CLEAR_FOLLOWS = 'CLEAR_FOLLOWS';

// dispatch (Action을 실행, 다른 js 파일에서 쓰임)
// reducer (Action 결과로 state를 어떻게 바꿀지 정의)
const userReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        // state 변경으로 렌더링이 되기 때문에
        // 기존 state 불변성을 유지하가 위해 기존 state 를 복사해서 넘김
        // return {
        //   ...state,
        //   isLoggingIn: true,
        //   loginErrorReason: ''
        // };
        const draft = draftState;
        draft.isLoggingIn = true;
        draft.loginErrorReason = '';
        break;
      }
      case LOG_IN_SUCCESS: {
        const draft = draftState;
        draft.isLoggingIn = false;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        const draft = draftState;
        draft.isLoggingIn = false;
        draft.me = null;
        draft.loginErrorReason = action.error;
        break;
      }

      case LOG_OUT_REQUEST: {
        const draft = draftState;
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        const draft = draftState;
        draft.isLoggingOut = false;
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        const draft = draftState;
        draft.isLoggingOut = false;
        draft.logoutErrorReason = '';
        break;
      }

      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS: {
        const draft = draftState;

        // 내 정보
        if (action.me) {
          draft.me = action.data;
          break;
        }

        // 남의 정보
        draft.userInfo = action.data;
        break;
      }
      case LOAD_USER_FAILURE: {
        break;
      }

      case SIGN_UP_REQUEST: {
        const draft = draftState;
        draft.isSigningUp = true;
        draft.isSignedUp = false;
        draft.signUpErrorReason = '';
        break;
      }
      case SIGN_UP_SUCCESS: {
        const draft = draftState;
        draft.isSigningUp = false;
        draft.isSignedUp = true;
        break;
      }
      case SIGN_UP_FAILURE: {
        const draft = draftState;
        draft.isSigningUp = false;
        draft.signUpErrorReason = '';
        break;
      }

      case FOLLOW_USER_REQUEST: {
        break;
      }
      case FOLLOW_USER_SUCCESS: {
        draftState.me.followings.unshift({id: action.data});
        break;
      }
      case FOLLOW_USER_FAILURE: {
        break;
      }

      case UN_FOLLOW_USER_REQUEST: {
        break;
      }
      case UN_FOLLOW_USER_SUCCESS: {
        let index = draftState.me.followings.findIndex(
          following => following.id === action.data
        );
        draftState.me.followings.splice(index, 1);

        index = draftState.followings.findIndex(
          following => following.id === action.data
        );
        draftState.followings.splice(index, 1);
        break;
      }
      case UN_FOLLOW_USER_FAILURE: {
        break;
      }

      case ADD_POST_TO_ME: {
        draftState.me.posts.unshift({id: action.data});
        break;
      }

      case REMOVE_POST_OF_ME: {
        const index = draftState.me.posts.findIndex(
          post => post.id === action.data
        );
        draftState.me.posts.splice(index, 1);
        break;
      }

      case LOAD_FOLLOWINGS_REQUEST: {
        const draft = draftState;
        draft.followings = !action.data.offset ? [] : draft.followings;
        draft.hasMoreFollowings = action.data.offset
          ? draft.hasMoreFollowings
          : true;
        return;
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        const draft = draftState;
        action.data.forEach(data => draft.followings.push(data));
        draft.hasMoreFollowings = action.data.length === 3;
        break;
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        break;
      }

      case LOAD_FOLLOWERS_REQUEST: {
        const draft = draftState;
        draft.followers = !action.data.offset ? [] : draft.followers;
        draft.hasMoreFollowers = action.data.offset
          ? draft.hasMoreFollowers
          : true;
        return;
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        const draft = draftState;
        action.data.forEach(data => draft.followers.push(data));
        draft.hasMoreFollowers = action.data.length === 3;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE: {
        break;
      }

      case REMOVE_FOLLOWER_REQUEST: {
        break;
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        let index = draftState.me.followers.findIndex(
          following => following.id === action.data
        );
        draftState.me.followers.splice(index, 1);

        index = draftState.followers.findIndex(
          following => following.id === action.data
        );
        draftState.followers.splice(index, 1);
        break;
      }
      case REMOVE_FOLLOWER_FAILURE: {
        break;
      }

      case EDIT_NICKNAME_REQUEST: {
        const draft = draftState;
        draft.isEditingNickname = true;
        draft.editNicknameErrorReason = '';
        break;
      }
      case EDIT_NICKNAME_SUCCESS: {
        const draft = draftState;
        draft.isEditingNickname = false;
        draft.me.nickname = action.data;
        break;
      }
      case EDIT_NICKNAME_FAILURE: {
        const draft = draftState;
        draft.isEditingNickname = false;
        draft.editNicknameErrorReason = action.error;
        break;
      }

      case CLEAR_FOLLOWS: {
        const draft = draftState;
        draft.followings = [];
        draft.followers = [];
        break;
      }

      default: {
        break;
      }
    }
  });
};

export default userReducer;
