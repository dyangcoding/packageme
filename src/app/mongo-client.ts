import * as Realm from 'realm-web';
import { ParcelProperties, UpstreamParcelProperties } from '../models/parcel';
import { UpstreamSessionProperties } from '../models/session';
import { ObjectId } from 'bson';

const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID || '';
const app = new Realm.App({ id: REALM_APP_ID });

async function loggIn() {
    const user: Realm.User = await app.logIn(Realm.Credentials.anonymous())
    return user;
}

async function getMongoDB() {
    const currentUser = app.currentUser ? app.currentUser : await loggIn();
    return currentUser.mongoClient('mongodb-atlas');
}

export async function parcelCollection() {
    const mongoDb = await getMongoDB();
    return mongoDb
        .db('findMyPackages')
        .collection<UpstreamParcelProperties>('parcels');
}

export async function sessionCollection() {
    const mongoDb = await getMongoDB();
    return mongoDb
        .db('findMyPackages')
        .collection<UpstreamSessionProperties>('sessions');
}

export async function fetchParcels() {
    const collection = await parcelCollection();
    return collection
        .find()
        .then(tweets => tweets as Array<UpstreamParcelProperties>);
}

export async function filterParcels(searchTerm: string) {
    const collection = await parcelCollection();
    const reg = { '$regex': new Realm.BSON.BSONRegExp(searchTerm) };
    const query = {
        '$or': [
            { 'info': reg},
            { 'remark': reg}
        ]
    };
    return collection.find(query);
}

export async function deleteSession(sessionID: string) {
    const collection = await sessionCollection();
    return collection.deleteOne({ '_id': sessionID } );
}

export async function insertParcels(parcels: ReadonlyArray<ParcelProperties>) {
    const collection = await parcelCollection();
    const documents = [];
    for (const parcel of parcels) {
        const document = {
            deliverDate: parcel.deliverDate,
            info: parcel.info,
            remark: parcel.remark,
            collected: parcel.collected
        };
        documents.push(document);
    }
    return collection.insertMany(documents);
}

export async function collectParcel(parcel: ParcelProperties) {
    const collection = await parcelCollection();
    return collection.updateOne(
        { _id: new ObjectId(parcel._id) },
        { $set: {collected: true} }  
    );
}