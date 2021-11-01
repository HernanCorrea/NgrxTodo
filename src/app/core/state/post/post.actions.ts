import { createAction, props } from "@ngrx/store";
import { PostI } from "./post.model";

export const addPost = createAction('addPost', props<{post: PostI}>());
export const updatePost = createAction('updatePost', props<{post: PostI}>());
export const deletePost = createAction('deletePost', props<{id: number}>());