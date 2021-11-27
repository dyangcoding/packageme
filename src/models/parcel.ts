import { ObjectId } from 'bson';

interface BaseProperties {
    readonly deliverDate: string;
    readonly info: string;
    readonly remark?: string;
    readonly collected?: boolean;
}

/** represents a Parcel Object stored inside MongoDB which has ObjectId as the unique identifier */
export interface UpstreamParcelProperties extends BaseProperties {
    readonly _id: ObjectId;
}

/** 
 * local representation of Parcel Object with the type of _id field replaced as string 
 * For adding Parcels no _id should be generated from the client, this happens at the mongoDB
 * */
export interface ParcelProperties extends BaseProperties {
    readonly _id?: string;
};

/** Convert UpstreamParcelProperties to ParcelProperties  */
export function convert(parcel: UpstreamParcelProperties): ParcelProperties {
    return {
        _id: parcel._id.toHexString(),
        deliverDate: parcel.deliverDate,
        info: parcel.info,
        remark: parcel.remark,
        collected: parcel.collected
    } as ParcelProperties;
}