import { createReducer, on } from '@ngrx/store';
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from './post.actions';
import { PostState } from './post.model';
import { initialStatePost } from './post.state';
export const PostReducer = createReducer(
  initialStatePost,
  on(loadPostsSuccess, (state: PostState, action) => {
    return {
      ...state,
      postList: action.posts
    };
  }),
  on(addPostSuccess, (state: PostState, action) => {
    return {
      ...state,
      postList: [...state.postList, action.post],
    };    
  }),
  on(updatePostSuccess, (state: PostState, action) => {
    const newPostList = state.postList.map(post => {
      if (post.id === action.post.id) {
        return action.post
      }
      return post
    });
    return {
      ...state,
      postList: newPostList,
    };    
  }),
  on(deletePostSuccess, (state: PostState, action) => {
    const postList = state.postList.filter(res => res.id !== action.id);
    return {
      ...state,
      postList,
    };    
  })
);


//   }),
//   on(deletePost, (state: PostState, action) => {
//     const postList = state.postList.filter(res => res.id !== action.id);
//     return {
//       ...state,
//       postList
//     }
//   })
