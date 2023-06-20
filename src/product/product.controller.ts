import { Controller, OnModuleInit } from '@nestjs/common';

@Controller('product')
export class ProductController implements OnModuleInit {
    async onModuleInit() {
        await new Promise((res, rej) => setTimeout(res, 10000));
    }

}
