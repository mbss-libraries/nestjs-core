import { IsNotEmpty, IsString } from 'class-validator';

export class OAuthDto {
	@IsNotEmpty()
	@IsString()
	accessToken!: string;
}
