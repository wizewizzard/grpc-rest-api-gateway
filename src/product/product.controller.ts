import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('product')
export class ProductController {
    constructor (private productService: ProductService) {
    }

    @Get("/all")
    getProducts(): Product[] {
        return this.productService.getAllProducts();
    }

    @Post()
    createProduct(title: string, price: number): Product {
        return this.productService.createProduct(title, price);
    }

    @Get("/:title/price")
    getProductPrice(@Param("title") title: string) {
        return this.productService.getProductPrice(title);
    }
}
