import { ThunkAction } from "../app/store";
import { requests } from "../services/ajax";

export enum ActionType {
    AuthenticateUserStartedAction = "AUTHENTICATE_USER_STARTED",
    AuthenticateUserCompletedAction = "AUTHENTICATE_USER_COMPLETED",
    AuthenticateUserFailedAction = "AUTHENTICATE_USER_FAILED",
}

export type Action = AuthenticateUserStartedAction | AuthenticateUserCompletedAction | AuthenticateUserFailedAction;

export interface AuthenticateUserStartedAction {
    readonly type: ActionType.AuthenticateUserStartedAction;
}

export interface AuthenticateUserCompletedAction {
    readonly type: ActionType.AuthenticateUserCompletedAction;
    readonly authenticated: boolean;
}

export interface AuthenticateUserFailedAction {
    readonly type: ActionType.AuthenticateUserFailedAction;
    readonly error: Error;
}

export function login(code: string): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.AuthenticateUserStartedAction});
        requests.post("/verify_otp", JSON.stringify({ code })).then(
            result => dispatch({type: ActionType.AuthenticateUserCompletedAction, authenticated: result}),
            reason => dispatch({type: ActionType.AuthenticateUserFailedAction, error: reason})
        )
    }
}