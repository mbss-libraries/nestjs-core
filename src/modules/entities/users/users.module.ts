import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
	imports: [],
	controllers: [UserController, UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
