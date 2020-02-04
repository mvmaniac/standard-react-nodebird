export const initialState = {
  mainPosts: [
    {
      user: {
        id: 1,
        nickname: '더미'
      },
      content: '더미 내용',
      img: 'https://i.pinimg.com/236x/cb/05/a9/cb05a9630a545502d2be98d25d3a3c0c.jpg'
    }
  ],
  imagePaths: []
};

export const ADD_POST = 'ADD_POST';
export const ADD_POST_DUMMY = 'ADD_POST_DUMMY';

export const addPost = {
  type: ADD_POST
};

export const addPostDummy = {
  type: ADD_POST_DUMMY,
  data: {
    content: 'default',
    User: {
      id: 1,
      nickname: '디폴트'
    }
  }
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {...state};
    }

    case ADD_POST_DUMMY: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts]
      };
    }

    default: {
      return {...state};
    }
  }
};

export default postReducer;
