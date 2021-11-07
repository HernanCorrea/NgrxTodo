import { AuthState } from './auth/auth.model';
import { AUTH_STATUS_NAME } from './auth/auth.selector';
import { PostState } from './post/post.model';
import { POST_STATE_NAME } from './post/post.selector';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';

export interface AppState {
    [POST_STATE_NAME]: PostState;
    [AUTH_STATUS_NAME]: AuthState;
    [SHARED_STATE_NAME]: SharedState;
}
