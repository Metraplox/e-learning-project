import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch {
      throw new HttpException(
        'Error al obtener usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.usersService.findById(id);
    } catch {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      return await this.usersService.findByEmail(email);
    } catch {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        error.message || 'Error al crear usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUser: Partial<CreateUserDto>,
  ) {
    try {
      return await this.usersService.update(id, updateUser);
    } catch {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.usersService.delete(id);
    } catch {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
