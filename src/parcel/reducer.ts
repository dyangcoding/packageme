import { Status } from '../app/store';
import { ParcelProperties } from '../models/parcel';
import { Action, ActionType } from './actions';

interface ParcelState {
    readonly value: ReadonlyArray<ParcelProperties>,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: ParcelState = {
    value: [] as ParcelProperties[],
    loading: 'idle',
    error: undefined
};

export function parcelReducer(state: ParcelState = initialState, action: Action): ParcelState {
    switch (action.type) {
        case ActionType.LoadParcelsStartedAction:
            return {...state, loading: 'loading'};
        case ActionType.LoadParcelsCompletedAction:
            return {...state, loading: 'completed', value: action.parcels};
        case ActionType.LoadParcelsFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        case ActionType.ParcelInsertingStartedAction:
            return {...state, loading: 'inserting'};
        case ActionType.ParcelInsertingCompletedAction:
            const results = [action.parcel].concat(state.value);
            return {...state, loading: 'completed', value: results};
        case ActionType.ParcelInsertingFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        case ActionType.ParcelUpdatingStartedAction:
            return {...state, loading: 'updating'};
        case ActionType.ParcelUpdatingCompletedAction:
            const updated = state.value.filter(parcel => parcel.info !== action.parcel.info);
            const result = [action.parcel].concat(updated);
            return {...state, loading: 'completed', value: result};
        case ActionType.ParcelUpdatingFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        case ActionType.ParcelDeletingStartedAction:
            return {...state, loading: 'deleting'};
        case ActionType.ParcelDeletingCompletedAction:
            const removed = state.value.filter(parcel => parcel._id !== action._id);
            return {...state, loading: 'completed', value: removed};
        case ActionType.ParcelDeletingFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        case ActionType.SearchParcelsStartedAction:
            return {...state, loading: 'loading'};
        case ActionType.SearchParcelsCompletedAction:
            return {...state, loading: 'completed', value: action.parcels};
        case ActionType.SearchParcelsFailedAction:
            return {...state, loading: 'failed', error: action.error.message};
        default:
            return state;
    }
}