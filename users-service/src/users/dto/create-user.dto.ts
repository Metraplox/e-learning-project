// users-service/src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;

  @IsEnum(['STUDENT', 'ADMIN'])
  role: string;
}
