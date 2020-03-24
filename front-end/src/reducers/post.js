import produce from 'immer';

export const initialState = {
  // 화면에 보일 포스트들
  mainPosts: [
    // {
    //   id: 1,
    //   user: {
    //     id: 1,
    //     nickname: '더미'
    //   },
    //   content: '더미 내용',
    //   images: [
    //     {
    //       src: 'https://i.pinimg.com/236x/cb/05/a9/cb05a9630a545502d2be98d25d3a3c0c.jpg'
    //     }
    //   ],
    //   comments: []
    // }
  ],

  // 미리보기 이미지 경로
  imagePaths: [],

  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  isAddedPost: false, // 포스트 업로드 성공

  addCommentErrorReason: false, // 댓글 업로드 실패 사유
  isAddingComment: false, // 댓글 업로드 중
  isAddedComment: false, // 댓글 업로드 성공

  hasMorePost: false,
  singlePost: null
};

// const dummyPost = {
//   id: 1,
//   user: {
//     id: 1,
//     nickname: '더미'
//   },
//   content: '더미내용'
// };

// const dummyComment = {
//   id: 1,
//   user: {
//     id: 1,
//     nickname: '더미'
//   },
//   createAt: new Date(),
//   content: '더미댓글'
// };

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

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

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

export const CLEAR_POSTS = 'CLEAR_POSTS';

const postReducer = (state = initialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case LOAD_POST_SUCCESS: {
        const draft = draftState;
        draft.singlePost = action.data;
        break;
      }
      case LOAD_POST_FAILURE: {
        break;
      }

      case ADD_POST_REQUEST: {
        const draft = draftState;
        draft.isAddingPost = true;
        draft.isAddedPost = false;
        draft.addPostErrorReason = '';
        break;
      }
      case ADD_POST_SUCCESS: {
        const draft = draftState;
        draft.isAddingPost = false;
        draft.isAddedPost = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        const draft = draftState;
        draft.isAddingPost = false;
        draft.addPostErrorReason = action.error;
        break;
      }

      case LOAD_MAIN_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST: {
        const draft = draftState;
        const lastId = action.data && action.data.lastId;
        draft.mainPosts = !lastId ? [] : draft.mainPosts;
        draft.hasMorePost = lastId ? draft.hasMorePost : true;
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS: {
        const draft = draftState;
        action.data.forEach((data) => draft.mainPosts.push(data));
        draft.hasMorePost = action.data.length === 10;
        break;
      }
      case LOAD_MAIN_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_USER_POSTS_FAILURE: {
        break;
      }

      case ADD_COMMENT_REQUEST: {
        const draft = draftState;
        draft.isAddingComment = true;
        draft.isAddedComment = false;
        draft.addCommentErrorReason = '';
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const draft = draftState;
        const postIndex = draft.mainPosts.findIndex(
          (post) => post.id === action.data.postId
        );
        draft.isAddingComment = false;
        draft.isAddedComment = true;
        draft.mainPosts[postIndex].comments.push(action.data.comment);
        break;
      }
      case ADD_COMMENT_FAILURE: {
        const draft = draftState;
        draft.isAddingComment = false;
        draft.addCommentErrorReason = action.error;
        break;
      }

      case LOAD_COMMENTS_SUCCESS: {
        const draft = draftState;
        const postIndex = draft.mainPosts.findIndex(
          (post) => post.id === action.data.postId
        );
        draft.mainPosts[postIndex].comments = action.data.comments;
        break;
      }
      case LOAD_COMMENTS_FAILURE: {
        break;
      }

      case UPLOAD_IMAGES_REQUEST: {
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data.forEach((p) => draftState.imagePaths.push(p));
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        break;
      }
      case REMOVE_IMAGE: {
        const index = draftState.imagePaths.findIndex(
          (imagePath, idx) => idx === action.data.index
        );
        draftState.imagePaths.splice(index, 1);
        break;
      }

      case LIKE_POST_REQUEST: {
        break;
      }
      case LIKE_POST_SUCCESS: {
        const draft = draftState;
        const postIndex = draft.mainPosts.findIndex(
          (post) => post.id === action.data.postId
        );
        draft.mainPosts[postIndex].likers.unshift({id: action.data.userId});
        break;
      }
      case LIKE_POST_FAILURE: {
        break;
      }

      case UNLIKE_POST_REQUEST: {
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        const draft = draftState;
        const postIndex = draft.mainPosts.findIndex(
          (post) => post.id === action.data.postId
        );
        const likeIndex = draft.mainPosts[postIndex].likers.findIndex(
          (liker) => liker.id !== action.data.userId
        );
        draft.mainPosts[postIndex].likers.splice(likeIndex, 1);
        break;
      }
      case UNLIKE_POST_FAILURE: {
        break;
      }

      case RETWEET_REQUEST: {
        break;
      }
      case RETWEET_SUCCESS: {
        draftState.mainPosts.unshift(action.data);
        break;
      }
      case RETWEET_FAILURE: {
        break;
      }

      case REMOVE_POST_REQUEST: {
        break;
      }
      case REMOVE_POST_SUCCESS: {
        const index = draftState.mainPosts.findIndex(
          (post) => post.id === action.data
        );
        draftState.mainPosts.splice(index, 1);
        break;
      }
      case REMOVE_POST_FAILURE: {
        break;
      }

      case CLEAR_POSTS: {
        const draft = draftState;
        draft.mainPosts = [];
        break;
      }

      default: {
        break;
      }
    }
  });
};

export default postReducer;
