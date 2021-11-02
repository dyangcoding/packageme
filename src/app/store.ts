import { ThunkAction as ReduxThunkAction } from "redux-thunk";
import { ThunkDispatch as ReduxThunkDispatch } from "redux-thunk";
import { Action, configureStore } from "@reduxjs/toolkit";

import { Action as ParcelsAction, ActionType as ParcelsActionType } from "../parcel/actions";
import { parcelReducer } from "../parcel/reducer";
import { parcelCollection } from "./mongo-client";
import { toParcelProperties, UpstreamParcelProperties } from "../models/parcel";
export type ThunkDispatch<A extends Action=Action> = ReduxThunkDispatch<AppState, never, A>
export type Status = "idle" | "loading" | "inserting" | "deleting" | "completed" | "failed";

export type AppAction = ParcelsAction;

export type ThunkAction<A extends AppAction, R = void> = ReduxThunkAction<R, AppState, never, A>;
export type AsyncThunkAction<A extends AppAction = AppAction, R = void> = ThunkAction<A, PromiseLike<R>>;

export const store = configureStore({
  reducer: {
    parcels: parcelReducer,
  }
});

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const parcelsPipeline = [
    { 
      $in: [ "insert" ] 
    }
  ];
  
  (() => {
    parcelCollection()
    .then(async collection => {
        for await (const parcel of collection.watch(parcelsPipeline)) {
          const { fullDocument } = parcel as globalThis.Realm.Services.MongoDB.InsertEvent<UpstreamParcelProperties>;
          if (fullDocument) {
            store.dispatch({type: ParcelsActionType.ParcelInsertingStartedAction});
            store.dispatch({type: ParcelsActionType.ParcelInsertingCompletedAction, parcel: toParcelProperties(fullDocument)});
          }
        }
    })
  })()