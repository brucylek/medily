import { Injectable } from '@nestjs/common';
//import { FirestoreProvider } from '../database/firebase.provider';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
import { appFirebase } from "../database/firebaseconfig";

@Injectable()
export class ActivityService {

    constructor(){}

    async findAll() {
        const db = getFirestore(appFirebase);
        const activitiesCol = collection(db, 'Activity');
        const Snapshot = await getDocs(activitiesCol);
        const activitiesList = Snapshot.docs.map(doc => doc.data());
        return activitiesList;
    }

    async findbyId(id : string) {
        const db = getFirestore(appFirebase);
        const activity = await getDoc(doc(db,'Activity',id));
        if (activity.exists()) {
            console.log(activity.data());
             return activity.data();
        }
        else{
            console.log(`Activity ${id} not found`)
        return Promise.reject(Error(`Activity ${id} not found`))
        }
    }
}
