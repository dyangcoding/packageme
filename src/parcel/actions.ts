import { fetchParcels, filterParcels } from '../app/mongo-client';
import { AsyncThunkAction, ThunkAction } from '../app/store';
import { convert, ParcelProperties } from '../models/parcel';

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

    ParcelDeletingStartedAction = 'PARCEL_DELETING_STARTED',
    ParcelDeletingCompletedAction = 'PARCEL_DELETING_COMPLETED',
    ParcelDeletingFailedAction = 'PARCEL_DELETING_FAILED',

    SearchParcelsStartedAction = 'SEARCH_PARCELS_STARTED',
    SearchParcelsCompletedAction = 'SEARCH_PARCELS_COMPLETED',
    SearchParcelsFailedAction = 'SEARCH_PARCELS_FAILED'
}

export type Action = LoadParcelsStartedAction | LoadParcelsCompletedAction | LoadParcelsFailedAction |
            ParcelInsertingStartedAction | ParcelInsertingCompletedAction | ParcelInsertingFailedAction |
            ParcelUpdatingStartedAction | ParcelUpdatingCompletedAction | ParcelUpdatingFailedAction |
            ParcelDeletingStartedAction | ParcelDeletingCompletedAction | ParcelDeletingFailedAction |
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

export interface ParcelDeletingStartedAction {
    readonly type: ActionType.ParcelDeletingStartedAction;
}

export interface ParcelDeletingCompletedAction {
    readonly type: ActionType.ParcelDeletingCompletedAction;
    readonly _id: string;
}

export interface ParcelDeletingFailedAction {
    readonly type: ActionType.ParcelDeletingFailedAction;
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
            results => dispatch({type: ActionType.LoadParcelsCompletedAction, parcels: results.map(convert)}),
            reason => dispatch({type: ActionType.LoadParcelsFailedAction, error: reason})
        );
    }
}

export function searchParcels(searchTerm: string): AsyncThunkAction<Action, ReadonlyArray<ParcelProperties>> {
    return dispatch => {
        dispatch({type: ActionType.SearchParcelsStartedAction});
        return filterParcels(searchTerm).then(
            results => {
                const parcels = results.map(convert);
                dispatch({type: ActionType.SearchParcelsCompletedAction, parcels: parcels});
                return parcels;
            }, 
            reason => {
                dispatch({type: ActionType.SearchParcelsFailedAction, error: reason});
                throw reason;
            } 
        );
    }
}