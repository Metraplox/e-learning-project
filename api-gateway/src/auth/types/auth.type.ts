import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/types/user.type';
import { IsEmail, MinLength } from 'class-validator';

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(4)
  password: string;
}
