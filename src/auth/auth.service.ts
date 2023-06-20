import { Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthServiceClient, AUTH_SERVICE_NAME, ValidateResponse } from './auth.pb';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {

    constructor() {
        console.log('I am constructed');
    }
}
