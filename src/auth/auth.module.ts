import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AllowingGuard } from './allowing.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AllowingGuard],
  exports: [AllowingGuard]
})
export class AuthModule {}
