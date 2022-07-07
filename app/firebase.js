var admin = require('firebase-admin')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

admin.initializeApp({
    credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    databaseURL: "http://api-voss-host.europe-west4.firebasedatabase.app"
})

const db = getFirestore()

module.exports = db