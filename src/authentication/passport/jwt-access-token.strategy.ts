import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET, DB_SCHEMA_MASTER } from '@environments';
import { getManager } from 'typeorm';
import { UsersService } from 'src/modules/entities/users/users.service';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
	constructor(private readonly userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: ACCESS_TOKEN_SECRET,
		});
	}

	async validate(payload: IJWTAccessPayload) {
		const authUser = await this.userService.findOneById(payload.sub);

		if (!authUser || !authUser.status) {
			throw new UnauthorizedException();
		}

		// Update last_online_at to current timestamp of db
		getManager().query(
			`UPDATE "${DB_SCHEMA_MASTER}"."users" SET "last_online_at" = CURRENT_TIMESTAMP WHERE "id" = '${authUser.id}'`,
		);

		return { id: authUser.id, email: authUser.email, username: authUser.username, rights: authUser.rights ?? [] };
	}
}

interface IJWTAccessPayload {
	email: string;
	iat: number;
	exp: number;
	aud: string;
	iss: string;
	sub: string;
}

//* ---- Give access to user propertie in res.user ----
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface User {
			id: string;
			email: string;
			username?: string;
			rights: string[];
		}
	}
}
