import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User } from './types/user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'getUsers' })
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'getUserById' })
  async getUserById(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('input') createUserDto: CreateUserInput,
  ): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.error('Error en API Gateway:', error.message);
      throw new Error('Error al crear usuario: ' + error.message);
    }
  }
}
