import { Activity } from "../activity/activity.interface";
export interface Cart {
    _id : String;
    id_user : String;
    paid : boolean;
    payement_date : String;
    price: Number;
}

export interface Cart_Act {

    id_act: String;
    id_cart: String;
    nb_seats: Number;
    price: Number

}

export type AddAct = Pick<Cart_Act, 'id_act' | 'nb_seats'> & Partial<Cart_Act>