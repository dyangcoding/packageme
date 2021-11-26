import { Status } from "../app/store";
import { ToastProperties } from "./toast";
import { Action, ActionType } from "./actions";

interface UIState {
    readonly toasts: ReadonlyArray<ToastProperties>,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: UIState = {
    toasts: [] as ToastProperties[],
    loading: 'idle',
    error: undefined
};

export function uiReducer(state: UIState = initialState, action: Action): UIState {
    switch (action.type) {
        case ActionType.AddToastStartedAction:
            return {...state, loading: 'loading'};
        case ActionType.AddToastCompletedAction:
            const result = [action.toast].concat(state.toasts);
            return {...state, loading: 'completed', toasts: result};
        case ActionType.AddToastFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        case ActionType.RemoveToastStartedAction:
            return {...state, loading: 'loading'};
        case ActionType.RemoveToastCompletedAction:
            const removed = state.toasts.filter(toast => toast.id !== action.toastId);
            return {...state, loading: 'completed', toasts: removed};
        case ActionType.RemoveToastFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        default:
            return state;
    }
}