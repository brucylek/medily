import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [ActivityModule, UserModule, AdminModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
