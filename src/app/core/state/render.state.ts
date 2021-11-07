import { AuthReducer } from './auth/auth.reducer';
import { AUTH_STATUS_NAME } from './auth/auth.selector';
import { SharedReducer } from './shared/shared.recuder';
import { SHARED_STATE_NAME } from './shared/shared.selector';

export const renderState = {
  [AUTH_STATUS_NAME]: AuthReducer,
  [SHARED_STATE_NAME]: SharedReducer
};
