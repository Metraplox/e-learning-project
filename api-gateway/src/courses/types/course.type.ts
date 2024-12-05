import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  professorId: string;

  @Field(() => [String])
  tags: string[];
}
