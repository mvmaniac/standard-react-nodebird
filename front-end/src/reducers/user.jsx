const dummyUser = (data) => ({
  ...data,
  id: 1,
  email: 'dummy@gmail.com',
  nickname: '더미',
  posts: [{id: 1}],
  followings: [
    {nickname: '부기초'},
    {nickname: 'Chanho Lee'},
    {nickname: 'neue zeal'}
  ],
  followers: [
    {nickname: '부기초'},
    {nickname: 'Chanho Lee'},
    {nickname: 'neue zeal'}
  ]
});

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

  isChangeNicknameLoading: false, // 닉네임 변경 시도 중
  isChangeNicknameDone: false,
  changeNicknameError: null,

  my: null,
  signUpData: {},
  loginData: {}
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UN_FOLLOW_REQUEST = 'UN_FOLLOW_REQUEST';
export const UN_FOLLOW_SUCCESS = 'UN_FOLLOW_SUCCESS';
export const UN_FOLLOW_FAILURE = 'UN_FOLLOW_FAILURE';

export const signUpAction = (data) => ({
  type: SIGN_UP_REQUEST,
  data
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoginLoading: true,
        isLoginDone: false,
        loginError: null
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoginLoading: false,
        isLoginDone: true,
        my: dummyUser(action.data)
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoginLoading: false,
        loginError: action.error
      };
    }

    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLogoutLoading: true,
        isLogoutDone: false,
        logoutError: null
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLogoutLoading: false,
        isLogoutDone: true,
        my: null
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLogoutLoading: false,
        logoutError: action.error
      };
    }

    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSignUpLoading: true,
        isSignUpDone: false,
        signUpError: null,
        signUpData: action.data
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSignUpLoading: false,
        isSignUpDone: true,
        signUpData: action.data
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSignUpLoading: false,
        signUpError: action.error
      };
    }

    case CHANGE_NICKNAME_REQUEST: {
      return {
        ...state,
        isChangeNicknameLoading: true,
        isChangeNicknameDone: false,
        changeNicknameError: null
      };
    }
    case CHANGE_NICKNAME_SUCCESS: {
      return {
        ...state,
        isChangeNicknameLoading: false,
        isChangeNicknameDone: true,
        signUpData: action.data
      };
    }
    case CHANGE_NICKNAME_FAILURE: {
      return {
        ...state,
        isChangeNicknameLoading: false,
        changeNicknameError: action.error
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};

export default userReducer;
