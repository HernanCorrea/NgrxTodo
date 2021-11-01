import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AppState} from '../app.state';
import { PostState } from './post.model';

export const POST_STATE_NAME = 'postS'

// export const selectPostState = createFeatureSelector<
//   AppState,
//   Readonly<PostState>
// >('posts');

const selectPostState = createFeatureSelector<PostState>(POST_STATE_NAME);

export const getPostList = createSelector(
    selectPostState,
    (post: PostState) => post.postList
);
export const getPostById = (id: number) => createSelector(
    selectPostState,
    (post: PostState) => {
        return post.postList.find(p => p.id === id)
    }
);
 

