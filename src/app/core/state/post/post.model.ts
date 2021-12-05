import { Post } from "../../models/Post.models";

export interface PostI {
    id: string;
    title: string;
    description: string;
}
export interface PostState {
    postList: Post[];
}
