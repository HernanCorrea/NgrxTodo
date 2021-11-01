import { counterReducer } from './counter/counter.reducer';
import { postReducer } from './post/post.reducer';

export const renderState = {
  count: counterReducer,
  posts: postReducer,
};
