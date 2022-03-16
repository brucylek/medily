import { OmitType } from "@nestjs/mapped-types";
import { IsDate,IsInt, IsDateString, IsOptional, IsString, Min, IsEmail, IsNumberString, IsNumber, MinLength, IsNotEmpty, isString, isNotEmpty } from "class-validator";
import { Activity, ActivityCreateDto } from "./activity.interface";

export class ActivityValidationDto implements Activity {
@IsOptional()  _id : string;
@IsString() @IsNotEmpty() address : String;
@IsString() date_end : String;
@IsString() @IsNotEmpty() date_start : String;
@IsString() @MinLength(20) description : String;
@IsNotEmpty() id_category : String;
@IsOptional() id_pro : string;
@IsString() @IsNotEmpty() name : String;
@IsInt() @Min(1) nb_seats : Number;
@IsNumber() @IsNotEmpty() @Min(5) price : Number;
}

//export class ActivityCreateValidationDto extends OmitType(ActivityValidationDto, ['_id']) implements ActivityCreateDto{};
