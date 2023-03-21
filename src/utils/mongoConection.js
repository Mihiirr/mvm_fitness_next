// import mongoose from 'mongoose';

// const connection = {};

// async function connect() {
//     if (connection.isConnected) {
//         console.log('already connected');
//         return;
//     }
//     if (mongoose.connections.length > 0) {
//         connection.isConnected = mongoose.connections[0].readyState;
//         if (connection.isConnected === 1) {
//             console.log('use previous connection');
//             return;
//         }
//         await mongoose.disconnect();
//     }
//     const db = await mongoose.connect(process.env.MONGO_URI);
//     console.log('new connection');
//     connection.isConnected = db.connections[0].readyState;
// }

// async function disconnect() {
//     if (connection.isConnected) {
//         if (process.env.NODE_ENV === 'production') {
//             await mongoose.disconnect();
//             connection.isConnected = false;
//         } else {
//             console.log('not disconnected');
//         }
//     }
// }

// function convertDocToObj(doc) {
//     doc._id = doc._id.toString();
//     doc.createdAt = doc.createdAt.toString();
//     doc.updatedAt = doc.updatedAt.toString();
//     return doc;
// }

// const db = { connect, disconnect, convertDocToObj };
// export default db;

import { MongoClient } from "mongodb";

const { MONGO_URI, MONGO_DB } = process.env;

if (!MONGO_URI) {
    throw new Error(
        "Please provide MONGO_URI to environment variable."
    )
}

if (!MONGO_DB) {
    throw new Error(
        "Please provide MONGO_DB to environment variable."
    )
}

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        cached.promise = MongoClient.connect(MONGO_URI, opts).then((client) => {
            return {
                client,
                db: client.db(MONGO_DB)
            }

        })
    }
    cached.conn = await cached.promise;
    return cached.conn;
}