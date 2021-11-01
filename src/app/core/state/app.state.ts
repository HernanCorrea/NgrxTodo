import { CounterI } from './counter/counter.model';
import { PostState } from './post/post.model';

export interface AppStateCounter {
    count: CounterI;
}
export interface AppState {
    posts: PostState;
    count: CounterI;
}
