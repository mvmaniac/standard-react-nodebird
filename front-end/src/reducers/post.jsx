const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  user: {
    id: 1,
    nickname: '제로초'
  },
  images: [],
  comments: []
};

export const initialState = {
  isAddPostLoading: false, // 포스트 등록 중
  isAddPostDone: false,
  addPostError: null,

  isAddCommentLoading: false, // 포스트 댓글 등록 중
  isAddCommentDone: false,
  addCommentError: null,

  mainPosts: [
    {
      id: 1,
      user: {
        id: 1,
        nickname: '제로초'
      },
      content: '첫 번째 게시글 #해시태그 #걸기 졸리군...',
      images: [
        {
          src:
            'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726'
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg'
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg'
        }
      ],
      comments: [
        {
          user: {
            nickname: 'nero'
          },
          content: '우와 개정판이 나왔군요~'
        },
        {
          user: {
            nickname: 'hero'
          },
          content: '얼른 사고싶어요~'
        }
      ]
    }
  ],
  imagePaths: []
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        isAddPostLoading: true,
        isAddPostDone: false,
        addPostError: null
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        isAddPostLoading: false,
        isAddPostDone: true
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        isAddPostLoading: false,
        addPostError: action.error
      };
    }

    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAddCommentLoading: true,
        isAddCommentDon: false,
        addCommentError: null
      };
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        isAddCommentLoading: false,
        isAddCommentDon: true
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddCommentLoading: false,
        addCommentError: action.error
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};
