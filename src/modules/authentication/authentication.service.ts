import {
	ACCESS_TOKEN_SECRET,
	AUDIENCE,
	EMAIL_TOKEN_SECRET,
	ISSUER,
	REFRESH_TOKEN_SECRET,
	RESETPASS_TOKEN_SECRET,
} from '@environments';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../entities/users/user.entity';

@Injectable()
export class AuthenticationService {
	constructor(private jwtService: JwtService) {}

	generateToken(user: User, type: TokenType) {
		const { payload, options } = getJWTSignInPayload(user, type);
		return this.jwtService.sign(payload, options);
	}
}

const getJWTSignInPayload = (
	user: User,
	type: TokenType,
): { payload: { [key: string]: string }; options: JwtSignOptions } => {
	return {
		payload: { email: user.email },
		options: {
			privateKey: common[type].privateKey,
			issuer: ISSUER,
			subject: user.id,
			audience: AUDIENCE,
			algorithm: 'HS256',
			expiresIn: common[type].signOptions.expiresIn,
		},
	};
};

const common = {
	accessToken: {
		privateKey: ACCESS_TOKEN_SECRET,
		signOptions: {
			// expiresIn: '1h',
			expiresIn: '30d',
		},
	},
	refreshToken: {
		privateKey: REFRESH_TOKEN_SECRET,
		signOptions: {
			expiresIn: '7d',
		},
	},
	emailToken: {
		privateKey: EMAIL_TOKEN_SECRET,
		signOptions: {
			expiresIn: '1d',
		},
	},
	resetPassToken: {
		privateKey: RESETPASS_TOKEN_SECRET,
		signOptions: {
			expiresIn: '1d',
		},
	},
};

export type TokenType = 'accessToken' | 'refreshToken' | 'emailToken' | 'resetPassToken';
