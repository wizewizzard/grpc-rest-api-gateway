import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    private readonly products = [
        new Product('Juice', 250.0),
        new Product('Bread', 150.0),
        new Product('Vine', 980.0),
    ];
    constructor(@Inject('ProductPricer') private productPricer) {
    }

    createProduct(title: string, price: number): Product {
        const product = new Product(title, price);
        this.products.push(product);
        return product;
    }

    getAllProducts(): Product[] {
        return this.products;
    }

    getProductPrice(title: string): number {
        const product = this.products.find(p => p.title === title);
        if (product) {
            return this.productPricer.getPriceWithDiscount(product.price);
        } else throw new HttpException(`Product with title: ${title} was not found`, HttpStatus.NOT_FOUND);
    }
}
