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
    
    @Patch('/:id')
    update(@Param('id') id: string) {
     
    }

    @Post()
    create(@Body() newUser: User)  {
        return this.userService.createUser(newUser);   
    }


}
