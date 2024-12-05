import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import axios from 'axios';
import { User } from './types/user.type';

@Injectable()
export class UsersService {
  private readonly usersServiceUrl =
    process.env.USERS_SERVICE_URL || 'http://localhost:3001';

  async findAll(): Promise<User[]> {
    try {
      const { data } = await axios.get<User[]>(`${this.usersServiceUrl}/users`);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException(
        'Error al obtener usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const { data } = await axios.get<User>(
        `${this.usersServiceUrl}/users/${id}`,
      );
      return data;
    } catch (error) {
      console.error('Error fetching user by id:', error);
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const { data } = await axios.get<User>(
        `${this.usersServiceUrl}/users/email/${email}`,
      );
      return data;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateUserInput) {
    try {
      const response = await this.httpService
        .post('http://elearning_users:3000/users', createUserDto)
        .toPromise(); // Convierte la llamada HTTP en una Promesa
      return response.data;
    } catch (error) {
      console.error('Error en comunicación con Users-Service:', error.message);
      throw new Error('No se pudo crear el usuario');
    }
  }
}
