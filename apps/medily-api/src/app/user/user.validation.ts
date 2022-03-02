import { PickType } from "@nestjs/mapped-types";

import { IsOptional, IsString, Min, IsEmail, IsNumberString, IsNumber, MinLength, IsNotEmpty } from "class-validator";
import { User, UserLoginDto } from "./user.interface";

export class UserValidationDto implements User{
 
   _id : String;
   @IsString() @IsNotEmpty() pseudo : String;
    @IsEmail() @IsNotEmpty() email : string;
    @IsString() @MinLength(8) password : String;
    @IsNumberString() @IsOptional() tel : String;
    @IsString() ville : String;
    @IsNumber() @Min(18) age : number;
    @IsString() @IsOptional() rule : string;
} 

export class LoginValidationDto extends PickType(UserValidationDto, ['email', 'password']) implements UserLoginDto{};
//export class LoginValidationDto extends PickType(BookValidationDto, ['id']) implements BookUpdateDto{}

