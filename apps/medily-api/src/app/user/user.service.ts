import { Injectable, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
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
        const user = await db.collection('User').doc(id).get()
        if (user.exists) {
            //console.log(user.data());
             return user.data();
        }
        else{
            //console.log(`User ${id} not found`)
           //return Promise.reject(Error(`User ${id} not found`))
           return new NotFoundException().getResponse();
        }
    }

    async findbyEmail(email : string) {
        const Snapshot = await db.collection('User').where('email', '==', email).get();
        if(!Snapshot.empty){
            const user = Snapshot.docs.map(doc => doc.data());
            return user;
        }
        else{
            return new NotFoundException().getResponse();
            //return Promise.reject(Error("Error getting user "));
        }
     
    }

    async createUser(item : User) {    
     if(item.age>18){
     
        if(item.email.length>0 && item.password.length>8 &&item.pseudo.length>0)
      {    
        const userRef = db.collection('User').doc();
        item._id=userRef.id;
        item.rule='user';
        const res = await userRef.set(item)
        .then(() => {
            console.log(`User ${item.pseudo} successfully created $`);
            return item;
        })
        .catch( (error) => {
            console.error(" Error creating user", item.pseudo, error);
            return Promise.reject(Error(`Error creating user ${item.pseudo}`));
        }); 
     }
     else{
         return('empty fields or not allowed value');
     }
    } 

    }

    async DeletebyId(id : string) {        
        const res = await db.collection('User').doc(id).delete()
        .then(() => {
            console.log(`User ${id} successfully deleted`);
            return(`User ${id} successfully deleted`);
        })
        .catch( (error) => {
            /*console.error(" Error removing user", id, error);
            return Promise.reject(Error(`Error deleting user ${id}`));*/
            return new NotFoundException().getResponse();
        });          
    }

    async login(login : User) {
        const Snapshot = await db.collection('User').where('email', '==', login.email).where('password', '==',login.password).get();
        if(!Snapshot.empty){
            const user = Snapshot.docs.map(doc => doc.data());
            return user;
        }
        else{
            //return Promise.reject(Error("User not found "));
            return new NotFoundException().getResponse();
        }
    }

    async changePassword(){

    }

    async update(id: string, item: User){
        const user = await db.collection('User').doc(id).update(
            {
                'pseudo': item.pseudo,
                'ville': item.ville,
                'tel': item.tel
            }
        )
        .then (() => {
            return (" Update done");
        })
        .catch( (error) => {
            console.error(" Error updating user", id, error);
            return Promise.reject(Error(`Error updating user ${id}`));
        } )
    }

    
}
