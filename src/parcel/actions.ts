import { fetchParcels } from "../app/mongo-client";
import { ThunkAction } from "../app/store";
import { ParcelProperties } from "../models/parcel";

export enum ActionType {
    LoadParcelsStartedAction = "LOAD_ParcelS_STARTED",
    LoadParcelsCompletedAction = "LOAD_ParcelS_COMPLETED",
    LoadParcelsFailedAction = "LOAD_ParcelS_FAILED",

    ParcelInsertingStartedAction = "Parcel_INSERTING_STARTED",
    ParcelInsertingCompletedAction = "Parcel_INSERTING_COMPLETED",
    ParcelInsertingFailedAction = "Parcel_INSERTING_FAILED",

    ParcelUpdatingStartedAction = "Parcel_UPDATING_STARTED",
    ParcelUpdatingCompletedAction = "Parcel_UPDATING_COMPLETED",
    ParcelUpdatingFailedAction = "Parcel_UPDATING_FAILED"
}

export type Action = LoadParcelsStartedAction | LoadParcelsCompletedAction | LoadParcelsFailedAction |
            ParcelInsertingStartedAction | ParcelInsertingCompletedAction | ParcelInsertingFailedAction |
            ParcelUpdatingStartedAction | ParcelUpdatingCompletedAction | ParcelUpdatingFailedAction;

export interface LoadParcelsStartedAction {
    readonly type: ActionType.LoadParcelsStartedAction;
}

export interface LoadParcelsCompletedAction {
    readonly type: ActionType.LoadParcelsCompletedAction;
    readonly parcels: ReadonlyArray<ParcelProperties>;
}

export interface LoadParcelsFailedAction {
    readonly type: ActionType.LoadParcelsFailedAction;
    readonly error: Error;
}

export interface ParcelInsertingStartedAction {
    readonly type: ActionType.ParcelInsertingStartedAction;
}

export interface ParcelInsertingCompletedAction {
    readonly type: ActionType.ParcelInsertingCompletedAction;
    readonly parcel: ParcelProperties;
}

export interface ParcelInsertingFailedAction {
    readonly type: ActionType.ParcelInsertingFailedAction;
    readonly error: Error;
}

export interface ParcelUpdatingStartedAction {
    readonly type: ActionType.ParcelUpdatingStartedAction;
}

export interface ParcelUpdatingCompletedAction {
    readonly type: ActionType.ParcelUpdatingCompletedAction;
    readonly parcel: ParcelProperties;
}

export interface ParcelUpdatingFailedAction {
    readonly type: ActionType.ParcelUpdatingFailedAction;
    readonly error: Error;
}

export function loadParcels(): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.LoadParcelsStartedAction});
        fetchParcels().then(
            results => dispatch({type: ActionType.LoadParcelsCompletedAction, parcels: sortParcels(results)}),
            reason => dispatch({type: ActionType.LoadParcelsFailedAction, error: reason})
        );
    }
}

export function insertParcel(parcel: ParcelProperties): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.ParcelInsertingStartedAction});
        dispatch({type: ActionType.ParcelInsertingCompletedAction, parcel: parcel});
    }
}

export function updateParcel(parcel: ParcelProperties): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.ParcelUpdatingStartedAction});
        dispatch({type: ActionType.ParcelUpdatingCompletedAction, parcel: parcel});
    }
}

// sort the parcels reversely according the diliver date
function sortParcels(parcels: ParcelProperties[]): ParcelProperties[] {
    if (!parcels) {
        return [];
    }
    return parcels.sort((p1, p2) => {
        if (!p1.deliverDate || !p2.deliverDate) {
            return 0;
        }
        return new Date(p2.deliverDate).getTime() - new Date(p1.deliverDate).getTime();
    });
}