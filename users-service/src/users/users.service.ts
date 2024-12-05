import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('Creating a new user');
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Buscar por ID
  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado`);
    }
    return user.toJSON();
  }

  // Buscar por email
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  // Obtener todos
  async findAll() {
    const users = await this.userModel.find();
    return users.map((user) => user.toJSON());
  }
}
