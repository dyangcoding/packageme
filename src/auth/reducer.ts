import { Status } from "../app/store";
import { Action, ActionType } from "./actions";

interface UserState {
    readonly authenticated: boolean,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: UserState = {
    authenticated: false,
    loading: "idle",
    error: undefined
};

export function userReducer(state: UserState = initialState, action: Action): UserState {
    switch (action.type) {
        case ActionType.AuthenticateUserStartedAction:
            return {...state, loading: "loading"};
        case ActionType.AuthenticateUserCompletedAction:
            return {...state, loading: "completed", authenticated: action.authenticated};
        case ActionType.AuthenticateUserFailedAction:
            return {...state, loading: "failed", error: action.error.message};
        default:
            return state;
    }
}