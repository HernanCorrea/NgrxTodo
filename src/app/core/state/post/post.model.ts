export interface PostI {
    id: number;
    title: string;
    content: string;
}
export interface PostState {
    postList: PostI[];
}
