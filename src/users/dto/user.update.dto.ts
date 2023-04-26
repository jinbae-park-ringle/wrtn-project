import { PartialType } from '@nestjs/mapped-types';
import { UserRequestDto } from './user.request.dto';

export class UserUpdateDto extends PartialType(UserRequestDto) {}
