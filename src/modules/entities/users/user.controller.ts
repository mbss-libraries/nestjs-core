import { Controller, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/authentication/guards/jwt-access-token.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAccessGuard)
@Controller({ path: 'user', version: '1' })
export class UserController {
	constructor(private readonly usersService: UsersService) {}

	// @Patch(':id')
	// async patchUser(@Param('id') id: string, @Body() body: PatchUserDto, @Request() req: TRequest) {
	// 	const user = await this.usersService.findOneById(id);
	// 	if (!user) throw new NotFoundException('User not found!');

	// 	if (body.points !== undefined) {
	// 		user.properties.points = req.body.points;
	// 	}

	// 	const _user = await user.save();
	// 	return returnResponse({ User: [_user] }, { excludeConvertToSmallUser: [user.id] });
	// }
}
