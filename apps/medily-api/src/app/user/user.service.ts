import { Injectable } from '@nestjs/common';
import { db } from "../database/firebaseconfig";
import {User} from "../user/user.interface";

@Injectable()
export class UserService {

    async findAll() {
        const Snapshot = await db.collection('User').get();
        const users = Snapshot.docs.map(doc => doc.data());
         return users;
    }

    async findbyId(id : string) {
        const user = await db.collection('User').doc(id).get();
        if (user.exists) {
            console.log(user.data());
             return user.data();
        }
        else{
            console.log(`User ${id} not found`)
        return Promise.reject(Error(`User ${id} not found`))
        }
    }

    async createUser(item : User) {        
        const userRef = db.collection('User').doc();
        item._id=userRef.id;
        const res = await userRef.set(item)
        .then(() => {
            console.log(`User ${item.pseudo} successfully created`);
            return item;
        })
        .catch( (error) => {
            console.error(" Error creating user", item.pseudo, error);
            return Promise.reject(Error(`Error creating user ${item.pseudo}`));
        });; 
                
    }

    
}
