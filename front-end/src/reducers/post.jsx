import {produce} from 'immer';
import faker from 'faker';

faker.seed(10000);

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  user: {
    id: 1,
    nickname: faker.internet.userName()
  },
  images: [],
  comments: []
});

const dummyComment = (data) => ({
  id: faker.random.number(),
  content: data,
  user: {
    id: 1,
    nickname: faker.internet.userName()
  }
});

export const initialState = {
  hasMorePost: true,

  isLoadPostLoading: false, // 포스트 불러오는 중
  isLoadPostDone: false,
  loadPostError: null,

  isAddPostLoading: false, // 포스트 등록 중
  isAddPostDone: false,
  addPostError: null,

  isRemovePostLoading: false, // 포스트 삭제 중
  isRemovePostDone: false,
  removePostError: null,

  isAddCommentLoading: false, // 포스트 댓글 등록 중
  isAddCommentDone: false,
  addCommentError: null,

  isRemoveCommentLoading: false, // 포스트 댓글 삭제 중
  isRemoveCommentDone: false,
  removeCommentError: null,

  mainPosts: [],
  imagePaths: []
};

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

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const loadPostRequestAction = (data) => ({
  type: LOAD_POST_REQUEST,
  data
});

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
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

const postReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST: {
        draft.isLoadPostLoading = true;
        draft.isLoadPostDone = false;
        draft.loadPostError = null;
        break;
      }
      case LOAD_POST_SUCCESS: {
        draft.isLoadPostLoading = false;
        draft.isLoadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      }
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
        draft.mainPosts.unshift(dummyPost(action.data)); // unshift: 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAddPostLoading = false;
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
          (value) => value.id !== action.data
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
        post.comments.unshift(dummyComment(action.data.content));

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

      default:
    }
  });

export default postReducer;
