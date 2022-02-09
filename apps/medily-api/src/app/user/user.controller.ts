import { Controller, Get, Param, Body, Post, Delete, Patch } from '@nestjs/common';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor( private userService : UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get('/:id')
    findById(@Param('id') id: string) {
        return this.userService.findbyId(id);
    }
    
    @Get('/get/:email')
    findByEmail(@Param('email') email: string) {
        return this.userService.findbyEmail(email);
    }
    
    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateUser: User) {
        return this.userService.update(id, updateUser);     
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
     return this.userService.DeletebyId(id);
    }

    @Post('/register')
    create(@Body() newUser: User)  {
        return this.userService.createUser(newUser);   
    }

    @Post('/login')
    login(@Body() Login: User)  {
        return this.userService.login(Login);   
    }


}
