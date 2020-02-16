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
  followers: [] // 팔로워 리스트
};

const dummyUser = {
  id: 1,
  nickname: '더미',
  posts: [],
  followings: [],
  followers: [],
  signUpData: {}
};

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

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UN_FOLLOW_USER_REQUEST = 'UN_FOLLOW_USER_REQUEST';
export const UN_FOLLOW_USER_SUCCESS = 'UN_FOLLOW_USER_SUCCESS';
export const UN_FOLLOW_USER_FAILURE = 'UN_FOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

// dispatch (Action을 실행, 다른 js 파일에서 쓰임)
// reducer (Action 결과로 state를 어떻게 바꿀지 정의)
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      // state 변경으로 렌더링이 되기 때문에
      // 기존 state 불변성을 유지하가 위해 기존 state 를 복사해서 넘김
      return {
        ...state,
        isLoggingIn: true,
        loginErrorReason: ''
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        me: action.data
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        me: null
      };
    }

    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        me: null
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
        logoutErrorReason: action.error
      };
    }

    case LOAD_USER_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        me: action.data
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state
      };
    }

    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: ''
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error
      };
    }

    default: {
      return {...state};
    }
  }
};

export default userReducer;
