import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthServiceClient, AUTH_SERVICE_NAME, ValidateResponse } from './auth.pb';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
    private authService: AuthServiceClient;
    constructor(@Inject(AUTH_SERVICE_NAME) private clientGrpc: ClientGrpc) {

    }
    onModuleInit() {
        this.authService = this.clientGrpc.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    validate(token: string): Promise<ValidateResponse> {
        return firstValueFrom(this.authService.validate({token}));
    }
}
