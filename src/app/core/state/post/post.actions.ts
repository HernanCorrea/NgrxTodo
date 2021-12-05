import { createAction, props } from "@ngrx/store";
import { Post } from "../../models/Post.models";
import { PostI } from "./post.model";

export const LOAD_POSTS = '[POST] Load Posts';
export const LOAD_POSTS_SUCCESS = '[POST] Load Posts Success';
export const ADD_POST = 'addPost'
export const ADD_POST_SUCCESS = '[POST] Add Post Success';
export const UPDATE_POST = '[POST] Add Update Success';
export const UPDATE_POST_SUCCESS = '[POST] Update Post Success';
export const DELETE_POST = '[POST] Delete Post Success';
export const DELETE_POST_SUCCESS = '[POST] Delete Post Success';


export const addPost = createAction(ADD_POST, props<{post: PostI}>());
export const addPostSuccess = createAction(
    ADD_POST_SUCCESS,
    props<{post: Post}>()
);

export const updatePost = createAction(
    UPDATE_POST,
    props<{post: PostI}>()
);
export const updatePostSuccess = createAction(
    UPDATE_POST_SUCCESS,
    props<{post: Post}>()
);

export const deletePost = createAction(
    DELETE_POST,
    props<{id: string}>()
);
export const deletePostSuccess = createAction(
    DELETE_POST_SUCCESS,
    props<{id: string}>()
);

export const loadPosts = createAction(LOAD_POSTS)
export const loadPostsSuccess = createAction(
    LOAD_POSTS_SUCCESS,
    props<{posts: Post[]}>()
)