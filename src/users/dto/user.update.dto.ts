import { PartialType } from '@nestjs/swagger';
import { UserRequestDto } from './user.request.dto';

export class UserUpdateDto extends PartialType(UserRequestDto) {}
