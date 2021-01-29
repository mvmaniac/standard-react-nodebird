const dummyUser = {
  id: 1,
  nickname: '더미',
  posts: [],
  followings: [],
  followers: []
};

export const initialState = {
  isLoggedIn: false,
  my: null,
  signUpData: {},
  loginData: {}
};

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export const signUpAction = (data) => ({
  type: SIGN_UP,
  data
});

export const signUpSuccess = {
  type: SIGN_UP_SUCCESS
};

export const loginAction = (data) => ({
  type: LOG_IN,
  data
});

export const logoutAction = {
  type: LOG_OUT
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        my: dummyUser,
        loginData: action.data
      };
    }

    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        my: null
      };
    }

    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};