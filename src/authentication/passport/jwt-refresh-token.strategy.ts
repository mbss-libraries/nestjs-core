import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { REFRESH_TOKEN_SECRET } from '@environments'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: REFRESH_TOKEN_SECRET
		})
	}

	async validate(payload: IJWTRefreshPayload) {
		return { id: payload.sub, email: payload.email }
	}
}

interface IJWTRefreshPayload {
	email: string
	iat: number
	exp: number
	aud: string
	iss: string
	sub: string
}
