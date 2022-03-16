import { Activity, ActivityCreateDto} from "../activity/activity.interface";
import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";

export const activityExample: Activity = {
    _id : 'WIHnB1vORauZhTTZdBKB',
address : `12 place de l'europe`,
date_end : '2 avril 2022  16:00:00',
date_start : '2 avril 2022  13:00:00',
description : `Le groupe Les Artisans vous invites à participer à une séance ouverte de poterie qui se tiendra à toulouse`,
id_category : `Art`,
id_pro : 'WIHnB1vORauZhTTZdBKB',
name : 'Pôterie',
nb_seats : 12,
price : 15.6
}

export class ApiActivity implements Activity{
    @ApiProperty({example: activityExample._id, type: String, pattern:'^[a-f0-9]{20}$'}) _id: string;
    @ApiProperty({example: activityExample.name, type: String}) name: string;
    @ApiProperty({example: activityExample.id_category, type: String}) id_category: string;
    @ApiProperty({example: activityExample.address, type: String}) address: string;
    @ApiProperty({example: activityExample.date_start, type: String, format: 'date-time'}) date_start: string;
    @ApiProperty({example: activityExample.date_end, type: String, format: 'date-time'}) date_end: string;
    @ApiProperty({example: activityExample.description, type: String}) description: string;
    @ApiProperty({example: activityExample.nb_seats, type: 'integer', minimum:1}) nb_seats: number;
    @ApiProperty({example: activityExample.price, type: Number, minimum:1}) price: number;
    @ApiProperty({example: activityExample.id_pro, type: String}) id_pro: string;

}

export class ApiActivityCreateDto extends OmitType(ApiActivity, ['_id']) implements ActivityCreateDto{}