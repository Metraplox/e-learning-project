import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, IsArray, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field()
  @IsNotEmpty({ message: 'El título es requerido' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio debe ser mayor a 0' })
  price: number;

  @Field()
  @IsNotEmpty({ message: 'El ID del profesor es requerido' })
  professorId: string;

  @Field(() => [String])
  @IsArray({ message: 'Las etiquetas deben ser un arreglo de strings' })
  tags: string[];
}
