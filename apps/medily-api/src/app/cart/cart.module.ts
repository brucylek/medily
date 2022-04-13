import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ActivityService } from '../activity/activity.service';

@Module({
  controllers: [CartController],
  providers: [CartService, ActivityService],
})
export class CartModule {}
