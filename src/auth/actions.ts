import { AsyncThunkAction, ThunkAction } from '../app/store';
import { requests } from '../services/ajax';
import { Logout } from '../services/storage';

export enum ActionType {
    LoginStartedAction = 'LOGIN_STARTED',
    LoginCompletedAction = 'LOGIN_COMPLETED',
    LoginFailedAction = 'LOGIN_FAILED',

    LogoutStartedAction = 'LOGOUT_STARTED',
    LogoutCompletedAction = 'LOGOUT_COMPLETED',
    LogoutFailedAction = 'LOGOUT_FAILED',
}

export type Action = LoginStartedAction | LoginCompletedAction | LoginFailedAction
    | LogoutStartedAction | LogoutCompletedAction | LogoutFailedAction;

export interface LoginStartedAction {
    readonly type: ActionType.LoginStartedAction;
}

export interface LoginCompletedAction {
    readonly type: ActionType.LoginCompletedAction;
    readonly sessionID: string;
}

export interface LoginFailedAction {
    readonly type: ActionType.LoginFailedAction;
    readonly error: Error;
}

export interface LogoutStartedAction {
    readonly type: ActionType.LogoutStartedAction;
}

export interface LogoutCompletedAction {
    readonly type: ActionType.LogoutCompletedAction;
    readonly sessionID: string;
}

export interface LogoutFailedAction {
    readonly type: ActionType.LogoutFailedAction;
    readonly error: Error;
}

export function login(code: string): AsyncThunkAction<Action, string> {
    return dispatch => {
        dispatch({type: ActionType.LoginStartedAction});
        return requests.post('/otp', JSON.stringify({ code })).then(
            result => {
                dispatch({type: ActionType.LoginCompletedAction, sessionID: result.sessionID});
                return result.sessionID;
            },
            reason => {
                dispatch({type: ActionType.LoginFailedAction, error: reason});
                throw reason;
            }
        );
    }
}

export function logout(): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.LogoutStartedAction});
        Logout().then(
            () => dispatch({type: ActionType.LogoutCompletedAction, sessionID: ''}),
            reason => dispatch({type: ActionType.LogoutFailedAction, error: reason})
        );
    }
}