import { Status } from "../app/store";
import { UpstreamParcelProperties } from "../models/parcel";
import { Action, ActionType } from "./actions";

interface ParcelState {
    readonly value: ReadonlyArray<UpstreamParcelProperties>,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: ParcelState = {
    value: [] as UpstreamParcelProperties[],
    loading: "idle",
    error: undefined
};

export function parcelReducer(state: ParcelState = initialState, action: Action): ParcelState {
    switch (action.type) {
        case ActionType.LoadParcelsStartedAction:
            return {...state, loading: "loading"}
        case ActionType.LoadParcelsCompletedAction:
            return {...state, loading: "completed", value: action.tweets}
        case ActionType.LoadParcelsFailedAction:
            return {...state, loading: "failed", error: action.error.message}
        case ActionType.ParcelInsertingStartedAction:
            return {...state, loading: "inserting"}
        case ActionType.ParcelInsertingCompletedAction:
            const results = [action.Parcel].concat(state.value);
            return {...state, loading: "completed", value: results}
        case ActionType.ParcelInsertingFailedAction:
            return {...state, loading: "failed", error: action.error.message}
        default:
            return state;
    }
}