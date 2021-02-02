import shortId from 'shortid';
import {customAlphabet} from 'nanoid/non-secure';

const nanoid = customAlphabet('1234567890', 4);
const randomId = () => parseInt(nanoid(), 10);

const dummyPost = (data) => ({
  id: randomId(),
  content: data,
  user: {
    id: 1,
    nickname: shortId.generate()
  },
  images: [],
  comments: []
});

const dummyComment = (data) => ({
  id: randomId(),
  content: data,
  user: {
    id: 1,
    nickname: shortId.generate()
  }
});

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
          id: randomId(),
          src:
            'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726'
        },
        {
          id: randomId(),
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg'
        },
        {
          id: randomId(),
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg'
        }
      ],
      comments: [
        {
          id: randomId(),
          user: {
            id: randomId(),
            nickname: 'nero'
          },
          content: '우와 개정판이 나왔군요~'
        },
        {
          id: randomId(),
          user: {
            id: randomId(),
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

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data
});

const postReducer = (state = initialState, action) => {
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
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
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
      // 수동으로 불변성 코드 작성
      const postIndex = state.mainPosts.findIndex(
        (value) => value.id === action.data.postId
      );
      const post = {...state.mainPosts[postIndex]};
      post.comments = [dummyComment(action.data.content), ...post.comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
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

export default postReducer;
