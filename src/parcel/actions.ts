import { fetchParcels, filterParcels } from '../app/mongo-client';
import { AsyncThunkAction, ThunkAction } from '../app/store';
import { ParcelProperties } from '../models/parcel';

export enum ActionType {
    LoadParcelsStartedAction = 'LOAD_PARCELS_STARTED',
    LoadParcelsCompletedAction = 'LOAD_PARCELS_COMPLETED',
    LoadParcelsFailedAction = 'LOAD_PARCELS_FAILED',

    ParcelInsertingStartedAction = 'PARCEL_INSERTING_STARTED',
    ParcelInsertingCompletedAction = 'PARCEL_INSERTING_COMPLETED',
    ParcelInsertingFailedAction = 'PARCEL_INSERTING_FAILED',

    ParcelUpdatingStartedAction = 'PARCEL_UPDATING_STARTED',
    ParcelUpdatingCompletedAction = 'PARCEL_UPDATING_COMPLETED',
    ParcelUpdatingFailedAction = 'PARCEL_UPDATING_FAILED',

    SearchParcelsStartedAction = 'SEARCH_PARCELS_STARTED',
    SearchParcelsCompletedAction = 'SEARCH_PARCELS_COMPLETED',
    SearchParcelsFailedAction = 'SEARCH_PARCELS_FAILED'
}

export type Action = LoadParcelsStartedAction | LoadParcelsCompletedAction | LoadParcelsFailedAction |
            ParcelInsertingStartedAction | ParcelInsertingCompletedAction | ParcelInsertingFailedAction |
            ParcelUpdatingStartedAction | ParcelUpdatingCompletedAction | ParcelUpdatingFailedAction |
            SearchParcelsStartedAction | SearchParcelsCompletedAction | SearchParcelsFailedAction;

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

export interface SearchParcelsStartedAction {
    readonly type: ActionType.SearchParcelsStartedAction;
}

export interface SearchParcelsCompletedAction {
    readonly type: ActionType.SearchParcelsCompletedAction;
    readonly parcels: ReadonlyArray<ParcelProperties>;
}

export interface SearchParcelsFailedAction {
    readonly type: ActionType.SearchParcelsFailedAction;
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

// TODO: fire proper actions based on the response of Reaml update results
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

export function searchParcels(searchTerm: string): AsyncThunkAction<Action, ReadonlyArray<ParcelProperties>> {
    return dispatch => {
        dispatch({type: ActionType.SearchParcelsStartedAction});
        return filterParcels(searchTerm).then(
            results => {
                dispatch({type: ActionType.SearchParcelsCompletedAction, parcels: results});
                return results;
            }, 
            reason => {
                dispatch({type: ActionType.SearchParcelsFailedAction, error: reason});
                throw reason;
            } 
        );
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