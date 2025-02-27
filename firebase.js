const admin = require('firebase-admin');

// Carga las credenciales del archivo JSON
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const tasksCollection = db.collection('tasks');

module.exports = { tasksCollection };