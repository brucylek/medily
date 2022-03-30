import { User, UserLoginDto} from '../user/user.interface';
import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";

export const userExample: User ={
    _id : 'NjHT313vYSULumleldmK',
    pseudo : 'mariono',
    email : 'marion@gmail.com',
    password : 'Mario13D',
    tel : '0654136754',
    ville : 'Toulouse',
    age : 18,
    rule : 'user'
}

export class ApiUser implements User{
    @ApiProperty({example: userExample._id, type: String, pattern:'^[a-f0-9]{20}$'}) _id: string;
    @ApiProperty({example: userExample.pseudo, type: String}) pseudo: string;
    @ApiProperty({example: userExample.email, type: String}) email: string;
    @ApiProperty({example: userExample.password, type: String}) password: string;
    @ApiProperty({example: userExample.tel, type: String}) tel: string;
    @ApiProperty({example: userExample.ville, type: String}) ville: string;
    @ApiProperty({example: userExample.age, type: 'integer', minimum:18}) age: number;
    @ApiProperty({example: userExample.rule, type: String}) rule: string;

}

export class ApiUserLoginDto extends PickType(ApiUser, ['email', 'password']) implements UserLoginDto{}