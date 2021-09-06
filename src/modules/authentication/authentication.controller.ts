import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@environments';
import { returnResponse } from '@helpers';
import { Controller, Post, Get, Body, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../entities/users/users.service';
import { AuthenticationService } from './authentication.service';
import { OAuthDto } from './dtos/oauth.dto';

@Controller({ path: 'authentication', version: '1' })
export class AuthenticationController {
	constructor(private readonly authService: AuthenticationService, private usersService: UsersService) {}

	@Post('oauth')
	async oauth(@Body() body: OAuthDto) {
		const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, '/oauth');
		const ticket = await client.verifyIdToken({ idToken: body.accessToken });
		const payload = ticket.getPayload();

		if (!payload?.email) throw new UnauthorizedException('Failed to authenticate with google!');
		const user = await this.usersService.findOneByEmail(payload.email);

		if (!user) throw new UnauthorizedException('User not found. Ask your lead to get access!');
		if (!user.status) throw new UnauthorizedException(`User "${user.email}" is disabled!`);

		const token = this.authService.generateToken(user, 'accessToken');

		return returnResponse({ message: 'success', token, User: [user] }, { excludeConvertToSmallUser: [user.id] });
	}

	@Get('isAuthenticated')
	isAuthenticated() {
		return returnResponse({ isAuthenticated: true });
	}

	@Get('allowedLoginMethods')
	getAllowedLoginMethods() {
		return returnResponse({ allowedLoginMethods: ['google'] });
	}
}
