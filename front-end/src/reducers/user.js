const dummyUser = {
  nickname: '더미',
  posts: [],
  followings: [],
  followers: [],
  signUpData: {}
};

// state, action, reducer 는 자주 쓰이므로 export 해주는게 좋음
// state (여기서는 User 정보만 담고 있음)
export const initialState = {
  isLoggedIn: false,
  user: null
};

// action (state를 바꾸는 행동)
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE= 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const loginAction = {
  type: LOG_IN_REQUEST
};

export const logoutAction = {
  type: LOG_OUT_REQUEST
};

export const signUpAction = data => {
  return {
    type: SIGN_UP_REQUEST,
    data
  }
}

// dispatch (Action을 실행, 다른 js 파일에서 쓰임)
// reducer (Action 결과로 state를 어떻게 바꿀지 정의)
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      // state 변경으로 렌더링이 되기 때문에
      // 기존 state 불변성을 유지하가 위해 기존 state 를 복사해서 넘김
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser
      };
    }
  
    case LOG_IN_SUCCESS: {
      return {...state};
    }

    case LOG_IN_FAILURE: {
      return {...state};
    }

    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }

    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpData: action.date
      };
    }

    default: {
      return {...state};
    }
  }
};

export default userReducer;
