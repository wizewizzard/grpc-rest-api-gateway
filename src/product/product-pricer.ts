import { Injectable } from "@nestjs/common";
import { ProductOptions } from "./product-options";

export const productPricer = {
    provide: 'ProductPricer',
    useFactory: (options: ProductOptions) => {
        console.log('Pricer constructs for discount: ' + options.discount);
        return {
            getPriceWithDiscount(standardPrice: number) {
                return standardPrice * (1 - options.discount);
            }  
        };
    },
    inject: [ProductOptions]
};
