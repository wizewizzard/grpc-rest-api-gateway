import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from './auth.pb';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: AUTH_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '0.0.0.0:50051',
                    package: AUTH_PACKAGE_NAME,
                    protoPath: 'node_modules/grpc-nest-proto/proto/auth.proto',
                },
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard],
})
export class AuthModule { }
