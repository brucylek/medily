import { Injectable } from '@nestjs/common';
//import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { db } from "../database/firebaseconfig";
import { Activity} from "../activity/activity.interface";


@Injectable()
export class ActivityService {

    constructor(){}
  
    async findAll() {
        const Snapshot = await db.collection('Activity').get();
        // const db = getFirestore(appFirebase);
        // const activitiesCol = collection(db, 'Activity');
        // const Snapshot = await getDocs(activitiesCol);
         const activitiesList = Snapshot.docs.map(doc => doc.data());
         return activitiesList;
    }

    async findbyId(id : string) {
        const activity = await db.collection('Activity').doc(id).get();
        // const db = getFirestore(appFirebase);
        // const activity = await getDoc(doc(db,'Activity',id));
        if (activity.exists) {
            console.log(activity.data());
             return activity.data();
        }
        else{
            console.log(`Activity ${id} not found`)
        return Promise.reject(Error(`Activity ${id} not found`))
        }
    }

    async update(item : Activity, id : string){
        item._id=id;
        const activity = await db.collection('Activity').doc(id).set(item);
        return item;  
    }

    async createActivity(item : Activity) {        
        const activityRef = db.collection('Activity').doc();
        item._id=activityRef.id;
        const res = await activityRef.set(item)
        .then(() => {
            console.log(`Activity ${item.name} successfully created`);
            return item;
        })
        .catch( (error) => {
            console.error(" Error creating activity", item.name, error);
            return Promise.reject(Error(`Error creating activity ${item.name}`));
        });; 
                
    }

    async DeletebyId(id : string) {        
        const res = await db.collection('Activity').doc(id).delete()
        .then(() => {
            console.log(`Activity ${id} successfully deleted`);
            return(`Activity ${id} successfully deleted`);
        })
        .catch( (error) => {
            console.error(" Error removing activity", id, error);
            return Promise.reject(Error(`Error deleting activity ${id}`));
        });          
    }

}
