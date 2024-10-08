import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "src/enums/roles.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private readonly jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];

        if (!token) throw new UnauthorizedException('Token requerido');

        try {
            const secret = process.env.JWT_SECRET;
            const payload = this.jwtService.verify(token, {secret});

            payload.exp = new Date(payload.exp * 10000);
            payload.iat = new Date(payload.iat * 10000);
            switch (payload.role) {
                case 'admin':
                    payload.role = [Role.Admin];
                    break;
                case 'profesor':
                    payload.role = [Role.Maestro];
                    break;
                case 'user':
                    payload.role = [Role.Alumno];
                    break;
                default:
                    throw new UnauthorizedException('Rol invalido')
            }

            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Token invalido')
        }
    }
}