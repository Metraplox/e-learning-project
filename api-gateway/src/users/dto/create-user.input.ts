import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

enum UserRole {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
  ADMIN = 'ADMIN',
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  fullname: string;

  @Field()
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @Field()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @Field(() => String)
  @IsEnum(UserRole, { message: 'El rol debe ser STUDENT, PROFESSOR o ADMIN' })
  role: UserRole;
}
