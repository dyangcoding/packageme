import { fetchParcels } from "../app/mongo-client";
import { ThunkAction } from "../app/store";
import { ParcelProperties } from "../models/parcel";

export enum ActionType {
    LoadParcelsStartedAction = "LOAD_ParcelS_STARTED",
    LoadParcelsCompletedAction = "LOAD_ParcelS_COMPLETED",
    LoadParcelsFailedAction = "LOAD_ParcelS_FAILED",

    ParcelInsertingStartedAction = "Parcel_INSERTING_STARTED",
    ParcelInsertingCompletedAction = "Parcel_INSERTING_COMPLETED",
    ParcelInsertingFailedAction = "Parcel_INSERTING_FAILED"
}

export type Action = LoadParcelsStartedAction | LoadParcelsCompletedAction | LoadParcelsFailedAction |
            ParcelInsertingStartedAction | ParcelInsertingCompletedAction | ParcelInsertingFailedAction;

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
    readonly Parcel: UpstreamParcelProperties;
}

export interface ParcelInsertingFailedAction {
    readonly type: ActionType.ParcelInsertingFailedAction;
    readonly error: Error;
}