import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductRequest, CreateProductResponse, FindOneResponse, PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME, ProductServiceClient } from './product.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('product')
export class ProductController implements OnModuleInit {

    private productService: ProductServiceClient;
    constructor(@Inject(PRODUCT_SERVICE_NAME) private readonly client: ClientGrpc) {}

    async onModuleInit() {
        this.productService = this.client.getService(PRODUCT_SERVICE_NAME);
    }

    @Post()
    @UseGuards(AuthGuard)
    private async createProduct(@Body() body: CreateProductRequest): Promise<Observable<CreateProductResponse>> {
        return this.productService.createProduct(body);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    private async findOne(@Param('id', ParseIntPipe) id: number): Promise<Observable<FindOneResponse>> {
        return this.productService.findOne({ id });
    }
}
