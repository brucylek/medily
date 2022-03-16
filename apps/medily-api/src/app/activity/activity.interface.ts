export interface Activity {
_id : String;
address : String;
date_end : String;
date_start : String;
description : String;
id_category : String;
id_pro : String;
name : String;
nb_seats : Number;
price : Number;
}

export type ActivityCreateDto = Omit<Activity, '_id'>
