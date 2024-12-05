import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field(() => String)
  role: 'STUDENT' | 'PROFESSOR' | 'ADMIN';

  password?: string;
}
