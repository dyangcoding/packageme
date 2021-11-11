export interface UpstreamSessionProperties {
    readonly _id: string;
    readonly cookie: object;
    readonly sessionID: string;
}

// remove _id which is only required from Mongo Client to fetch Tweet Collection
export type SessionProperties = Omit<UpstreamSessionProperties, "_id">;

export function toSessionProperties(session: UpstreamSessionProperties): SessionProperties {
    return {
        cookie: session.cookie,
        sessionID: session.sessionID,
    } as SessionProperties;
}