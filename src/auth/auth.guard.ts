import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> | never {
        const request = context.switchToHttp().getRequest();
        const authHeader: string = request.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException();
        }
        if (!authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException(); 
        }
        const token = authHeader.substring(7, authHeader.length);
        const resp = await this.authService.validate(token);
        if (resp.status !== HttpStatus.OK) {
            throw new UnauthorizedException(resp.error ? resp.error.join('. ') : `Wrong auth response status: ${resp.status}`);
        }
        request.user = resp.userId;
        return true;
    }
}

