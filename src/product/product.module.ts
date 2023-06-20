import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService as ProductService } from './product.service';
import { ProductOptions } from './product-options';
import { productPricer } from './product-pricer';

@Module({
  controllers: [ProductController],
  providers: [ 
    {
      provide: ProductService,
      useClass: ProductService
    },
    {
      provide: ProductOptions,
      useValue: {discount: 0.15}
    },
    productPricer
  ]
})
export class ProductModule {}
