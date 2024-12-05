import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './types/course.type';
import { CreateCourseInput } from './types/create-course.types';

@Resolver()
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => [Course], { name: 'getCourses' })
  async getCourses(): Promise<Course[]> {
    return this.coursesService.getCourses();
  }

  @Query(() => Course, { name: 'getCourseById' })
  async getCourseById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Course> {
    return this.coursesService.getCourseById(id);
  }

  @Query(() => [Course], { name: 'getCoursesByProfessor' })
  async getCoursesByProfessor(
    @Args('professorId', { type: () => ID }) professorId: string,
  ): Promise<Course[]> {
    return this.coursesService.getCoursesByProfessor(professorId);
  }

  @Mutation(() => Course)
  async createCourse(@Args('input') input: CreateCourseInput): Promise<Course> {
    return this.coursesService.create(input);
  }
}
