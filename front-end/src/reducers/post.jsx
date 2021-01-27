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
  mainPosts: [
    {
      id: 1,
      user: {
        id: 1,
        nickname: '제로초'
      },
      content: '첫 번째 게시글',
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
  imagePaths: [],
  postAdded: false
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts], // 앞에 있어야 맨 위로 올라감
        postAdded: true
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
