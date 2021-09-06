import { ACCESS_TOKEN_SECRET } from '@environments';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessTokenStrategy } from 'src/authentication/passport/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from 'src/authentication/passport/jwt-refresh-token.strategy';
import { UsersModule } from '../entities/users/users.module';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
	imports: [
		forwardRef(() => UsersModule),
		PassportModule,
		JwtModule.register({
			privateKey: ACCESS_TOKEN_SECRET,
		}),
	],
	controllers: [AuthenticationController],
	providers: [AuthenticationService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthenticationModule {}
