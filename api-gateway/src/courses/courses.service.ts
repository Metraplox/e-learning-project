import { Injectable } from '@nestjs/common';
import { Course } from './types/course.type';
import { CreateCourseInput } from './types/create-course.types';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'NestJS Basics',
      description: 'Learn the basics of NestJS',
      price: 10,
      professorId: 'John Doe',
      tags: ['nestjs', 'javascript', 'nodejs'],
    },
    {
      id: '2',
      title: 'NestJS Advanced',
      description: 'Learn the advanced features of NestJS',
      price: 29.99,
      professorId: 'John Doe',
      tags: ['nestjs', 'javascript', 'nodejs'],
    },
    {
      id: '3',
      title: 'GraphQL Basics',
      description: 'Learn the basics of GraphQL',
      price: 100,
      professorId: 'Jane Doe',
      tags: ['graphql', 'javascript'],
    },
  ];

  async getCourseById(id: string): Promise<Course> {
    const course = this.courses.find((course) => course.id === id);
    if (!course) {
      throw new Error(`Course with ID ${id} not found`);
    }
    return course;
  }

  async getCourses(): Promise<Course[]> {
    return this.courses;
  }

  async getCoursesByProfessor(professorId: string): Promise<Course[]> {
    return this.courses.filter((course) => course.professorId === professorId);
  }

  async create(input: CreateCourseInput): Promise<Course> {
    const course: Course = {
      id: String(this.courses.length + 1),
      ...input,
    };

    this.courses.push(course);
    return course;
  }
}
