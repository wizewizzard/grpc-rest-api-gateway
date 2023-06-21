import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [OrderController]
})
export class OrderModule {}
