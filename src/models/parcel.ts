export interface UpstreamParcelProperties {
    readonly _id: string;
    readonly deliverDate?: string;
    readonly info: string;
    readonly remark?: string;
    readonly collected?: boolean;
}

// remove _id which is only required from Mongo Client to fetch Tweet Collection
export type PackageProperties = Omit<UpstreamParcelProperties, "_id">;

export function toParcelProperties(parcel: UpstreamParcelProperties): PackageProperties {
    return {
        deliverDate: parcel.deliverDate,
        info: parcel.info,
        remark: parcel.remark,
        collected: parcel.collected,
    } as PackageProperties;
}