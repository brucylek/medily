import { Controller, Get, Param, Body, Post, Delete, Patch, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { User } from './user.interface';
import { UserService } from './user.service';
import { LoginValidationDto, UserValidationDto } from './user.validation';
import { ApiUser, ApiUserLoginDto, userExample } from './user.documentation';
import { ApiQuery,ApiBadRequestResponse, ApiBody, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiCreatedResponse } from '@nestjs/swagger';


@Controller('user')
export class UserController {

    constructor( private userService : UserService) {}

    @Get()
    @ApiCreatedResponse({ type: [ApiUser]})
    findAll() {
        return this.userService.findAll();
    }

    @Get('/:id')
    @ApiParam({type: String, name: 'id', example: userExample._id})
    @ApiOkResponse({ type: ApiUser})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    findById(@Param('id') id: string) {
        return this.userService.findbyId(id);
    }
    
    @Get('/get/:email')
    @ApiParam({type: String, name: 'email', example: userExample.email})
    @ApiOkResponse({ type: ApiUser})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    findByEmail(@Param('email') email: string) {
        return this.userService.findbyEmail(email);
    }
    
    @Patch('/:id')
    @ApiBody({ type: ApiUser})
    @ApiParam({type: String, name: 'id', example: userExample._id})
    @ApiOkResponse({ type: ApiUser})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    update(@Param('id') id: string, @Body() updateUser: User) {
        return this.userService.update(id, updateUser);     
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiParam({type: String, name: 'id', example: userExample._id})
    @ApiNoContentResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    delete(@Param('id') id: string) {
     return this.userService.DeletebyId(id);
    }

    @Post('/register')
    @ApiCreatedResponse({ type: ApiUser})
    @ApiBody({ type: ApiUser})
    @ApiBadRequestResponse()
    create(@Body(ValidationPipe) newUser: UserValidationDto)  {
        return this.userService.createUser(newUser);   
    }

    @Post('/login')
    @ApiCreatedResponse({ type: ApiUser})
    @ApiBody({ type: ApiUserLoginDto})
    @ApiBadRequestResponse()
    login(@Body(ValidationPipe) Login: LoginValidationDto)  {
        return this.userService.login(Login);   
    }


}
