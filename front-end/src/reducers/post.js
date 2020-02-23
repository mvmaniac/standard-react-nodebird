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
      images: [
        {
          src: 'https://i.pinimg.com/236x/cb/05/a9/cb05a9630a545502d2be98d25d3a3c0c.jpg'
        }
      ],
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
        mainPosts: [action.data, ...state.mainPosts],
        imagePaths: []
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: action.error
      };
    }

    case LOAD_MAIN_POSTS_REQUEST:
    case LOAD_HASHTAG_POSTS_REQUEST:
    case LOAD_USER_POSTS_REQUEST: {
      return {
        ...state,
        mainPosts: []
      };
    }
    case LOAD_MAIN_POSTS_SUCCESS:
    case LOAD_HASHTAG_POSTS_SUCCESS:
    case LOAD_USER_POSTS_SUCCESS: {
      return {
        ...state,
        mainPosts: action.data
      };
    }
    case LOAD_MAIN_POSTS_FAILURE:
    case LOAD_HASHTAG_POSTS_FAILURE:
    case LOAD_USER_POSTS_FAILURE: {
      return {
        ...state
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
      const findPostIndex = state.mainPosts.findIndex(post => post.id === action.data.postId);
      const post = state.mainPosts[findPostIndex];

      const comments = [...post.comments, action.data.comment];
      const mainPosts = [...state.mainPosts];

      mainPosts[findPostIndex] = {...post, comments};

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

    case LOAD_COMMENTS_SUCCESS: {
      const findPostIndex = state.mainPosts.findIndex(post => post.id === action.data.postId);
      const post = state.mainPosts[findPostIndex];

      const {comments} = action.data;
      const mainPosts = [...state.mainPosts];

      mainPosts[findPostIndex] = {...post, comments};

      return {
        ...state,
        mainPosts
      };
    }
    case LOAD_COMMENTS_FAILURE: {
      return {
        ...state
      };
    }

    case UPLOAD_IMAGES_REQUEST: {
      return {
        ...state
      };
    }
    case UPLOAD_IMAGES_SUCCESS: {
      return {
        ...state,
        imagePaths: [...state.imagePaths, ...action.data]
      };
    }
    case UPLOAD_IMAGES_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_IMAGE: {
      return {
        ...state,
        imagePaths: state.imagePaths.filter((imagePath, i) => i !== action.data.index)
      };
    }

    case LIKE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case LIKE_POST_SUCCESS: {
      const findPostIndex = state.mainPosts.findIndex(post => post.id === action.data.postId);
      const findPost = state.mainPosts[findPostIndex];
      const likers = [{id: action.data.userId}, ...findPost.likers];
      const mainPosts = [...state.mainPosts];

      mainPosts[findPostIndex] = {...findPost, likers};

      return {
        ...state,
        mainPosts
      };
    }
    case LIKE_POST_FAILURE: {
      return {
        ...state
      };
    }

    case UNLIKE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case UNLIKE_POST_SUCCESS: {
      const findPostIndex = state.mainPosts.findIndex(post => post.id === action.data.postId);
      const findPost = state.mainPosts[findPostIndex];
      const likers = findPost.likers.filter(post => post.id !== action.data.userId);
      const mainPosts = [...state.mainPosts];

      mainPosts[findPostIndex] = {...findPost, likers};

      return {
        ...state,
        mainPosts
      };
    }
    case UNLIKE_POST_FAILURE: {
      return {
        ...state
      };
    }

    case RETWEET_REQUEST: {
      return {
        ...state
      };
    }
    case RETWEET_SUCCESS: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts]
      };
    }
    case RETWEET_FAILURE: {
      return {
        ...state
      };
    }

    default: {
      return {...state};
    }
  }
};

export default postReducer;
