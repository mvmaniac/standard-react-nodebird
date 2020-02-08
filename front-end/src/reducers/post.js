export const initialState = {
  // 화면에 보일 포스트들
  mainPosts: [
    {
      id: 1,
      user: {
        id: 1,
        nickname: '더미'
      },
      content: '더미 내용',
      img: 'https://i.pinimg.com/236x/cb/05/a9/cb05a9630a545502d2be98d25d3a3c0c.jpg',
      comments: []
    }
  ],

  // 미리보기 이미지 경로
  imagePaths: [],

  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  isAddedPost: false, // 포스트 업로드 성공

  addCommentErrorReason: false, // 댓글 업로드 실패 사유
  isAddingComment: false, // 댓글 업로드 중
  isAddedComment: false // 댓글 업로드 성공
};

const dummyPost = {
  id: 1, 
  user: {
    id: 1,
    nickname: '더미'
  },
  content: '더미내용'
};

const dummyComment = {
  id: 1,
  user: {
    id: 1,
    nickname: '더미'
  },
  createAt: new Date(),
  content: '더미댓글'
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_DUMMY = 'ADD_POST_DUMMY';

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
        isAddedPost: false,
        addPostErrorReason: ''
      };
    }

    case ADD_POST_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
        isAddedPost: true,
        mainPosts: [dummyPost, ...state.mainPosts]
      };
    }

    case ADD_POST_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: action.error
      };
    }

    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAddingComment: true,
        isAddedComment: false,
        addCommentErrorReason: ''
      };
    }

    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(post => post.id === action.data.postId);
      const post = state.mainPosts[postIndex];

      const comments = [...post.comments, dummyComment];
      const mainPosts = [...state.mainPosts];

      mainPosts[postIndex] = {...post, comments};

      return {
        ...state,
        isAddingComment: false,
        isAddedComment: true,
        mainPosts
      };
    }

    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: action.error
      };
    }

    default: {
      return {...state};
    }
  }
};

export default postReducer;
