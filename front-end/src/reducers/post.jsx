import faker from 'faker';
import produce from '../utils/produce';

faker.seed(10000);

// 임시 데이터
// const dummyPost = (data) => ({
//   id: data.id,
//   content: data.content,
//   user: {
//     id: 1,
//     nickname: faker.internet.userName()
//   },
//   images: [],
//   comments: []
// });

// const dummyComment = (data) => ({
//   id: faker.random.number(),
//   content: data,
//   user: {
//     id: 1,
//     nickname: faker.internet.userName()
//   }
// });

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: faker.random.number(),
      user: {
        id: faker.random.number(),
        nickname: faker.internet.userName()
      },
      content: faker.lorem.paragraph(),
      images: [
        {
          id: faker.random.number(),
          src: faker.image.image()
        }
      ],
      comments: [
        {
          user: {
            id: faker.random.number(),
            nickname: faker.internet.userName()
          },
          content: faker.lorem.sentence()
        }
      ]
    }));

export const initialState = {
  hasMorePost: true,

  isGetPostLoading: false, // 포스트 하나 불러오는 중
  isGetPostDone: false,
  getPostError: null,

  isLoadPostLoading: false, // 포스트 목록 불러오는 중
  isLoadPostDone: false,
  loadPostError: null,

  isAddPostLoading: false, // 포스트 등록 중
  isAddPostDone: false,
  addPostError: null,

  isUpdatePostLoading: false, // 포스트 수정 중
  isUpdatePostDone: false,
  addUpdateError: null,

  isRemovePostLoading: false, // 포스트 삭제 중
  isRemovePostDone: false,
  removePostError: null,

  isAddCommentLoading: false, // 포스트 댓글 등록 중
  isAddCommentDone: false,
  addCommentError: null,

  isRemoveCommentLoading: false, // 포스트 댓글 삭제 중
  isRemoveCommentDone: false,
  removeCommentError: null,

  isRetweetLoading: false, // 리트윗 중
  isRetweetDone: false,
  retweetError: null,

  isLikePostLoading: false, // 포스트 종아요 등록 중
  isLikePostDone: false,
  likePostError: null,

  isUnLikePostLoading: false, // 포스트 좋아요 취소 중
  isUnLikePostDone: false,
  unLikePostError: null,

  isUploadImagesLoading: false, // 이미지 업로드 중
  isUploadImagesDone: false,
  uploadImagesError: null,

  mainPosts: [],
  imagePaths: [],
  singlePost: null
};

export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_POST_BY_USER_REQUEST = 'LOAD_POST_BY_USER_REQUEST';
export const LOAD_POST_BY_USER_SUCCESS = 'LOAD_POST_BY_USER_SUCCESS';
export const LOAD_POST_BY_USER_FAILURE = 'LOAD_POST_BY_USER_FAILURE';

export const LOAD_POST_BY_HASHTAG_REQUEST = 'LOAD_POST_BY_HASHTAG_REQUEST';
export const LOAD_POST_BY_HASHTAG_SUCCESS = 'LOAD_POST_BY_HASHTAG_SUCCESS';
export const LOAD_POST_BY_HASHTAG_FAILURE = 'LOAD_POST_BY_HASHTAG_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UN_LIKE_POST_REQUEST = 'UN_LIKE_POST_REQUEST';
export const UN_LIKE_POST_SUCCESS = 'UN_LIKE_POST_SUCCESS';
export const UN_LIKE_POST_FAILURE = 'UN_LIKE_POST_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';
export const RETWEET_ERROR_CLEAR = 'RETWEET_ERROR_CLEAR';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const getPostRequestAction = (data) => ({
  type: GET_POST_REQUEST,
  data
});

export const loadPostRequestAction = (data) => ({
  type: LOAD_POST_REQUEST,
  data
});

export const loadPostByUserRequestAction = (data) => ({
  type: LOAD_POST_BY_USER_REQUEST,
  data
});

export const loadPostByHashtagRequestAction = (data) => ({
  type: LOAD_POST_BY_HASHTAG_REQUEST,
  data
});

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data
});

export const updatePostRequestAction = (data) => ({
  type: UPDATE_POST_REQUEST,
  data
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data
});

export const removeCommentRequestAction = (data) => ({
  type: REMOVE_COMMENT_REQUEST,
  data
});

export const retweetRequestAction = (data) => ({
  type: RETWEET_REQUEST,
  data
});

export const retweetErrorClearAction = () => ({
  type: RETWEET_ERROR_CLEAR
});

export const likePostRequestAction = (data) => ({
  type: LIKE_POST_REQUEST,
  data
});

export const unLikePostRequestAction = (data) => ({
  type: UN_LIKE_POST_REQUEST,
  data
});

export const uploadImagesRequestAction = (data) => ({
  type: UPLOAD_IMAGES_REQUEST,
  data
});

export const removeImageAction = (data) => ({
  type: REMOVE_IMAGE,
  data
});

const postReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_POST_REQUEST: {
        draft.isGetPostLoading = true;
        draft.isGetPostDone = false;
        draft.getPostError = null;
        break;
      }
      case GET_POST_SUCCESS: {
        draft.isGetPostLoading = false;
        draft.isGetPostDone = true;
        draft.singlePost = action.data;
        break;
      }
      case GET_POST_FAILURE: {
        draft.isGetPostLoading = false;
        draft.getPostError = action.error;
        break;
      }

      case LOAD_POST_BY_USER_REQUEST:
      case LOAD_POST_BY_HASHTAG_REQUEST:
      case LOAD_POST_REQUEST: {
        draft.isLoadPostLoading = true;
        draft.isLoadPostDone = false;
        draft.loadPostError = null;
        break;
      }
      case LOAD_POST_BY_USER_SUCCESS:
      case LOAD_POST_BY_HASHTAG_SUCCESS:
      case LOAD_POST_SUCCESS: {
        draft.isLoadPostLoading = false;
        draft.isLoadPostDone = true;
        draft.mainPosts = [...draft.mainPosts, ...action.data];
        draft.hasMorePost = action.data.length === 10;
        break;
      }
      case LOAD_POST_BY_USER_FAILURE:
      case LOAD_POST_BY_HASHTAG_FAILURE:
      case LOAD_POST_FAILURE: {
        draft.isLoadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      }

      case ADD_POST_REQUEST: {
        draft.isAddPostLoading = true;
        draft.isAddPostDone = false;
        draft.addPostError = null;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.isAddPostLoading = false;
        draft.isAddPostDone = true;
        draft.mainPosts.unshift(action.data); // unshift: 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAddPostLoading = false;
        draft.addPostError = action.error;
        break;
      }

      case UPDATE_POST_REQUEST: {
        draft.isUpdatePostLoading = true;
        draft.isUpdatePostDone = false;
        draft.updatePostError = null;
        break;
      }
      case UPDATE_POST_SUCCESS: {
        draft.isUpdatePostLoading = false;
        draft.isUpdatePostDone = true;

        const findPost = draft.mainPosts.find(
          (value) => value.id === action.data.id
        );

        findPost.content = action.data.content;

        draft.imagePaths = [];
        break;
      }
      case UPDATE_POST_FAILURE: {
        draft.isUpdatePostLoading = false;
        draft.addPostError = action.error;
        break;
      }

      case REMOVE_POST_REQUEST: {
        draft.isRemovePostLoading = true;
        draft.isRemovePostDone = false;
        draft.addPostError = null;
        break;
      }
      case REMOVE_POST_SUCCESS: {
        draft.isRemovePostLoading = false;
        draft.isRemovePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (value) => value.id !== action.data.postId
        );
        break;
      }
      case REMOVE_POST_FAILURE: {
        draft.isRemovePostLoading = false;
        draft.removePostError = action.error;
        break;
      }

      case ADD_COMMENT_REQUEST: {
        draft.isAddCommentLoading = true;
        draft.isAddCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        // immer로 코드 작성
        const post = draft.mainPosts.find(
          (value) => value.id === action.data.postId
        );
        post.comments.unshift(action.data);

        // 수동으로 불변성 코드 작성
        // const postIndex = state.mainPosts.findIndex(
        //   (value) => value.id === action.data.postId
        // );
        // const post = {...state.mainPosts[postIndex]};
        // post.comments = [dummyComment(action.data.content), ...post.comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;

        draft.isAddCommentLoading = false;
        draft.isAddCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.isAddCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      }

      case REMOVE_COMMENT_REQUEST: {
        draft.isRemoveCommentLoading = true;
        draft.isRemoveCommentDone = false;
        draft.removeCommentError = null;
        break;
      }
      case REMOVE_COMMENT_SUCCESS: {
        draft.isRemoveCommentLoading = false;
        draft.isRemoveCommentDon = true;
        break;
      }
      case REMOVE_COMMENT_FAILURE: {
        draft.isRemoveCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      }

      case RETWEET_REQUEST: {
        draft.isRetweetLoading = true;
        draft.isRetweetDone = false;
        draft.retweetError = null;
        break;
      }
      case RETWEET_SUCCESS: {
        draft.isRetweetLoading = false;
        draft.isRetweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      }
      case RETWEET_FAILURE: {
        draft.isRetweetLoading = false;
        draft.retweetError = action.error;
        break;
      }
      case RETWEET_ERROR_CLEAR: {
        draft.retweetError = null;
        break;
      }

      case LIKE_POST_REQUEST: {
        draft.isLikePostLoading = true;
        draft.isLoadPostDone = false;
        draft.likePostError = null;
        break;
      }
      case LIKE_POST_SUCCESS: {
        draft.isLikePostLoading = false;
        draft.isLikePostDone = true;

        const post = draft.mainPosts.find(
          (value) => value.id === action.data.postId
        );

        post.likers.push({id: action.data.userId});
        break;
      }
      case LIKE_POST_FAILURE: {
        draft.isAddCommentLoading = false;
        draft.likePostError = action.error;
        break;
      }

      case UN_LIKE_POST_REQUEST: {
        draft.isUnLikePostLoading = true;
        draft.isUnLoadPostDone = false;
        draft.unLikePostError = null;
        break;
      }
      case UN_LIKE_POST_SUCCESS: {
        draft.isUnLikePostLoading = false;
        draft.isUnLikePostDone = true;

        const post = draft.mainPosts.find(
          (value) => value.id === action.data.postId
        );

        post.likers = post.likers.filter(
          (value) => value.id !== action.data.userId
        );
        break;
      }
      case UN_LIKE_POST_FAILURE: {
        draft.isUnLikePostLoading = false;
        draft.unLikePostError = action.error;
        break;
      }

      case UPLOAD_IMAGES_REQUEST: {
        draft.isUploadImagesLoading = true;
        draft.isUploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.isUploadImagesLoading = false;
        draft.isUploadImagesDone = true;
        draft.imagePaths.unshift(...action.data);
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.isUploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      }

      case REMOVE_IMAGE: {
        draft.imagePaths = draft.imagePaths.filter(
          (value, index) => index !== action.data.index
        );
        break;
      }

      default:
    }
  });

export default postReducer;
