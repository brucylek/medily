import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../firebaseconfig'; 

const serviceAccount = {
    apiKey: "AIzaSyCswiM_xi4ptEbqLkw4yyIeqFGAkwzPANw",
    authDomain: "medily-auth.firebaseapp.com",
    databaseURL: "https://medily-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "medily-auth",
    storageBucket: "medily-auth.appspot.com",
    messagingSenderId: "1006671217964",
    appId: "1:1006671217964:web:85aeed37ee50886ca4d889",
    measurementId: "G-HEHLBFVN8T",
    clientEmail: "medily.dev1@gmail.com"
}
const firebase_params: admin.ServiceAccount = {
    projectId: serviceAccount.projectId,
    privateKey: serviceAccount.apiKey,
    clientEmail: serviceAccount.clientEmail,
}

@Injectable()
export class FirestoreProvider {
    public db: admin.firestore.Firestore;

    private defaultApp: any;

    constructor() {
        this.defaultApp = admin.initializeApp({
            credential: admin.credential.cert(firebase_params)
        });
        this.db = admin.firestore()
    }

}