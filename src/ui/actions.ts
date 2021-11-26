import { ThunkAction } from "../app/store";
import { ToastProperties } from "./toast";

export enum ActionType {
    AddToastStartedAction = 'ADD_TOAST_STARTED',
    AddToastCompletedAction = 'ADD_TOAST_COMPLETED',
    AddToastFailedAction = 'ADD_TOAST_FAILED',

    RemoveToastStartedAction = 'REMOVE_TOAST_STARTED',
    RemoveToastCompletedAction = 'REMOVE_TOAST_COMPLETED',
    RemoveToastFailedAction = 'REMOVE_TOAST_FAILED'
}

export type Action = AddToastStartedAction | AddToastCompletedAction | AddToastFailedAction |
        RemoveToastStartedAction | RemoveToastCompletedAction | RemoveToastFailedAction;

export interface AddToastStartedAction {
    readonly type: ActionType.AddToastStartedAction;
}

export interface AddToastCompletedAction {
    readonly type: ActionType.AddToastCompletedAction;
    readonly toast: ToastProperties;
}

export interface AddToastFailedAction {
    readonly type: ActionType.AddToastFailedAction;
    readonly error: Error;
}

export interface RemoveToastStartedAction {
    readonly type: ActionType.RemoveToastStartedAction;
}

export interface RemoveToastCompletedAction {
    readonly type: ActionType.RemoveToastCompletedAction;
    readonly toastId: number;
}

export interface RemoveToastFailedAction {
    readonly type: ActionType.RemoveToastFailedAction;
    readonly error: Error;
}

export function addToast(toast: ToastProperties): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.AddToastStartedAction});
        dispatch({type: ActionType.AddToastCompletedAction, toast: toast});
    }
}

export function removeToast(id: number): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.RemoveToastStartedAction});
        dispatch({type: ActionType.RemoveToastCompletedAction, toastId: id})
    }
}