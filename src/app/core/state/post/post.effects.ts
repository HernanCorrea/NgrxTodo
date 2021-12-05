import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, mergeMap, switchMap } from "rxjs/operators";
import { Post } from "../../models/Post.models";
import { PostService } from "../../services/post.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./post.actions";

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService){}

    loadPosts$ = createEffect(() => 
        this.actions$
        .pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                return this.postService.getPosts().pipe(
                    map((posts) => {
                       return loadPostsSuccess({posts})
                    })
                )
            })
        )
    )

    addPost$ = createEffect(() => 
        this.actions$
        .pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postService.addPost(action.post)
                .pipe(
                    map((postData) => {
                        const post = this.postService.formatPost({
                            ...action.post,
                            id: postData.name
                        });
                        return addPostSuccess({ post })
                    })
                )
            })
        )
    )

    updatePost$ = createEffect(() => 
        this.actions$
        .pipe(
            ofType(updatePost),
            mergeMap((action) => {
                const postModel: Post = this.postService.formatPost(action.post);
                return this.postService.patchPost(postModel)
                .pipe(
                    map(() => updatePostSuccess({ post: postModel }))
                )
            }),
        )
    )

    deletePost$ = createEffect(() =>
        this.actions$
        .pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postService.deletePost(action.id)
                .pipe(
                    map(() => deletePostSuccess({ id: action.id }))
                )
            })
        )

    )
}