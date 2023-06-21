import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController {
    @UseGuards(AuthGuard)
    @Get(":id")
    async getProduct(@Param("id") id: number) {
        return true;
    }
}
