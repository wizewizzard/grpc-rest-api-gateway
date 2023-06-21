import { Controller, Get, Post, Inject, Param, UseGuards, Req, Body, OnModuleInit } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderRequest, CreateOrderResponse, ORDER_SERVICE_NAME, OrderServiceClient } from './order.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { OrderCreateDto } from './order-create.dto';
import { Request } from 'express';
import { IGetUserAuthInfoRequest } from './request-with-user.interface';

@Controller('order')
export class OrderController implements OnModuleInit {

    private orderService: OrderServiceClient;
    constructor(@Inject(ORDER_SERVICE_NAME) private client: ClientGrpc) { }

    public onModuleInit(): void {
        this.orderService = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
    }

    @Post()
    @UseGuards(AuthGuard)
    private async createOrder(@Req() req: IGetUserAuthInfoRequest, @Body() body: OrderCreateDto): Promise<Observable<CreateOrderResponse>> {

        const payload: CreateOrderRequest = {
            userId: req.user,
            ...body
        };

        return this.orderService.createOrder(payload);
    }
}
