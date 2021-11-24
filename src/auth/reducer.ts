import { Status } from '../app/store';
import { getSessionItem } from '../services/storage';
import { Action, ActionType } from './actions';

interface UserState {
    readonly sessionID: string,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: UserState = {
    sessionID: getSessionItem('SID') || '',
    loading: 'idle',
    error: undefined
};

export function userReducer(state: UserState = initialState, action: Action): UserState {
    switch (action.type) {
        case ActionType.LoginStartedAction:
            return {...state, loading: 'loading'};
        case ActionType.LoginCompletedAction:
            return {...state, loading: 'completed', sessionID: action.sessionID};
        case ActionType.LoginFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        case ActionType.LogoutStartedAction:
            return {...state, loading: 'loading'};
        case ActionType.LogoutCompletedAction:
            return {...state, loading: 'completed', sessionID: action.sessionID};
        case ActionType.LogoutFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        case ActionType.ClearErrorAction:
            return {...state, loading: 'idle', error: undefined};
        default:
            return state;
    }
}