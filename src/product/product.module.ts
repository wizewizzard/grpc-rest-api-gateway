import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientGrpcProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './product.pb';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        ClientsModule.register([
            {
                name: PRODUCT_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '0.0.0.0:50053',
                    package: PRODUCT_PACKAGE_NAME,
                    protoPath: 'node_modules/grpc-nest-proto/proto/product.proto',
                },
            },
        ]),
    ],
    controllers: [ProductController]
})
export class ProductModule { }
