import { ObjectId } from 'bson';

export interface UpstreamParcelProperties {
    readonly _id: ObjectId;
    readonly deliverDate: string;
    readonly info: string;
    readonly remark?: string;
    readonly collected?: boolean;
}

// No _id will be generated from the client, this happens at the mongoDB
export type ParcelProperties = Omit<UpstreamParcelProperties, '_id'>;