import * as Realm from 'realm-web';
import { ParcelProperties, UpstreamParcelProperties } from '../models/parcel';
import { ObjectId } from 'bson';

/*
Modify Mongo Collection Output using Aggregation Pipelines
You can control collection output by providing an array of one or more of the following pipeline stages when configuring the change stream:
$match, $project, $addFields, $replaceRoot, $redact
See Change Events for more information on the change stream response document format.
https://docs.mongodb.com/manual/reference/change-events/#change-stream-output
*/
const pipeline = [
    {
      $sort: { _id: -1 }
    }
];

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

export async function fetchParcels() {
    const collection = await parcelCollection();
    return collection
        .aggregate(pipeline)
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
    const options = { 'sort': { '_id': -1 }};
    return collection.find(query, options);
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