import { counterReducer } from './counter/counter.reducer';
import { postReducer } from './post/post.reducer';
import { POST_STATE_NAME } from './post/post.selector';

export const renderState = {
  count: counterReducer,
  [POST_STATE_NAME]: postReducer,
};
