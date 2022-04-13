import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, Cart_Act, AddAct } from './cart.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/new:id')
  create(@Param('id') id: string) {
    return this.cartService.create(id);
  }

  @Get('/current')
  findCurrentCart() {
    return this.cartService.findCurrentCart();
  }

  @Post()
  addActivity(@Body() newAct: AddAct) {
    return this.cartService.addActivity(newAct);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch()
  update( @Body() newAct: AddAct) {
    return this.cartService.updateActivity(newAct);
  }

  @Delete()
  remove(@Body() newAct: Cart_Act) {
    return this.cartService.remove(newAct);
  }
}
