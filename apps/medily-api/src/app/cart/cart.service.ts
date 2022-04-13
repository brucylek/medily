import { Injectable } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { db } from "../database/firebaseconfig";
import { Cart, Cart_Act, AddAct } from './cart.interface';
import { Activity } from '../activity/activity.interface';


@Injectable()
export class CartService {
  constructor(private activityService: ActivityService){}
  
 async create(id: string) {
     let item : Cart = {
       _id : '',
      id_user : id,
      paid : false,
      payement_date : '',
      price: 0
    };
    const activityRef = db.collection('Cart').doc();
    item._id=activityRef.id;
    const res = await activityRef.set(item)
      .then(() => {
        console.log(`Cart ${item._id} successfully created`);
        return item;
      })
      .catch( (error) => {
        console.error(" Error creating cart", error);
        return Promise.reject(Error(`Error creating cart`));
        });
  }

  async addActivity(newActivity: AddAct) {

    let Currentcart : Cart;
    const findCart = await this.findCurrentCart()
    .then((resp : Cart) => {
      Currentcart = resp;
      newActivity.id_cart=resp._id;
    });

    const Snapshot = await db.collection('Cart-Activity').where('id_cart', '==', newActivity.id_cart)
    .where('id_act', '==', newActivity.id_act).get();
    const cartActs = Snapshot.docs.map(doc => doc.data());
    const cartsId = Snapshot.docs.map(doc => doc.id);
    const cartAct = cartActs[0];
    const cartId = cartsId[0];


    let updateActivity : Activity;
    const activityDetails = await this.activityService.findbyId(newActivity.id_act.toString())
    .then((item : Activity) => {
      updateActivity = item;
      updateActivity.nb_seats = Number(updateActivity.nb_seats) - Number(newActivity.nb_seats);
      newActivity.price = Number(item.price) * Number(newActivity.nb_seats);
     
    });
    
    await this.activityService.update(updateActivity,updateActivity._id.toString());
    if(Snapshot.empty) {
      const activityRef = db.collection('Cart-Activity').doc();
      await activityRef.set(newActivity);
    }
    else {
      newActivity.nb_seats = Number(newActivity.nb_seats) + Number(cartAct.nb_seats);
      newActivity.price = Number(updateActivity.price) * Number(newActivity.nb_seats);
      const activityRef = db.collection('Cart-Activity').doc(cartId);
      await activityRef.set(newActivity);
    }
    
    await this.updateCartPrice(Currentcart._id.toString())
    
  }

  async updateActivity(newActivity: AddAct) {

    let Currentcart : Cart;
    const findCart = await this.findCurrentCart()
    .then((resp : Cart) => {
      Currentcart = resp;
      newActivity.id_cart=resp._id;
    });

    const Snapshot = await db.collection('Cart-Activity').where('id_cart', '==', newActivity.id_cart)
    .where('id_act', '==', newActivity.id_act).get();
    const cartActs = Snapshot.docs.map(doc => doc.data());
    const cartsId = Snapshot.docs.map(doc => doc.id);
    const cartAct = cartActs[0];
    const cartId = cartsId[0];

    let updateSeat = (cartAct.nb_seats > newActivity.nb_seats) ? -newActivity.nb_seats : newActivity.nb_seats;

    let updateActivity : Activity;
    
    if(!Snapshot.empty)  {
    const activityDetails = await this.activityService.findbyId(newActivity.id_act.toString())
    .then((item : Activity) => {
      updateActivity = item;
      updateActivity.nb_seats = Number(updateActivity.nb_seats) - Number(updateSeat);
      newActivity.price = Number(item.price) * Number(newActivity.nb_seats);  
    });
    
    await this.activityService.update(updateActivity,updateActivity._id.toString());
    const activityRef = db.collection('Cart-Activity').doc(cartId);
    await activityRef.set(newActivity);
    await this.updateCartPrice(Currentcart._id.toString());
    }    
   
    
  }




  async updateCartPrice(id: string) {

    let totalPrice : number = 0;
    const Snapshot = await db.collection('Cart-Activity').where('id_cart', '==', id).get();
    Snapshot.forEach(element => {
      totalPrice += element.data().price;
    });

    const cartRef = db.collection('Cart').doc(id);
    const res = await cartRef.update({price : totalPrice});

  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async findCurrentCart() {
    const Snapshot = await db.collection('Cart').where('paid', '==', false).get();
    const cart = Snapshot.docs.map(doc => doc.data());
    const id : string = cart[0]._id
    return cart[0];
   
  }

 async remove(newActivity: Cart_Act) {

    const Snapshot = await db.collection('Cart-Activity').where('id_cart', '==', newActivity.id_cart)
    .where('id_act', '==', newActivity.id_act).get();
    const cartActs = Snapshot.docs.map(doc => doc.data());
    const cartsId = Snapshot.docs.map(doc => doc.id);
    const cartId = cartsId[0];

    await db.collection('Cart-Activity').doc(cartId).delete();
    await this.updateCartPrice(newActivity.id_cart.toString());

    let updateActivity : Activity;
    const activityDetails = await this.activityService.findbyId(newActivity.id_act.toString())
    .then((item : Activity) => {
      updateActivity = item;
      updateActivity.nb_seats = Number(updateActivity.nb_seats) + Number(newActivity.nb_seats); 
    });
    
    await this.activityService.update(updateActivity,updateActivity._id.toString());
  }
}
