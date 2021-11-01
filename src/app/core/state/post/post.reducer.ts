import { createReducer, on } from '@ngrx/store';
import { addPost, deletePost, updatePost } from './post.actions';
import { PostI, PostState } from './post.model';
import { initialStatePost } from './post.state';

export const postReducer = createReducer(
  initialStatePost,
  on(addPost, (state: PostState, action) => {
    const newPost = {
      ...action.post,
      id: state.postList.length + 1,
    }
    return {
      ...state,
      postList: [...state.postList, newPost],
    };
  }),
  on(updatePost, (state: PostState, action) => {
    const postList = state.postList.map(res => {
      if (res.id === action.post.id) {
        return {
          ...res,
          ...action.post,
        }
      }
      return res;
    });
    return {
      ...state,
      postList
    };
  }),
  on(deletePost, (state: PostState, action) => {
    const postList = state.postList.filter(res => res.id !== action.id);
    return {
      ...state,
      postList
    }
  })
);
