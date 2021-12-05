import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "../models/Post.models";
import { PostI } from "../state/post/post.model";

@Injectable({
    providedIn: "root"
  })
export class PostService {
    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.http.get("https://goals-e588b.firebaseio.com/posts.json").pipe(
            map((response) => {
                if (response === null) return [];
                return <Post[]>Object.values(response).map((val, index) => 
                    ({
                        ...val,
                        id: Object.keys(response)[index]
                    })
                );
            })
        );
    }

    addPost(post: PostI): Observable<{name: string}> {
        return this.http.post<{name: string}>(
            "https://goals-e588b.firebaseio.com/posts.json",
            post
        );
    }
    
    patchPost(post: Post): Observable<any> {
        const postData = {
            [post.id]: {title: post.title, description: post.description}
        }
        return this.http.patch(
            "https://goals-e588b.firebaseio.com/posts.json",
            postData
        );
    }
    
    deletePost(postId: string): Observable<any> {
        return this.http.delete(
            `https://goals-e588b.firebaseio.com/posts/${postId}.json`
        );
    }

    formatPost(data: PostI){
        return new Post(
            data.id,
            data.title,
            data.description
        );
    }
}