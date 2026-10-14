import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
  ) {
    const existingUser = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return null;
    }

    const user = this.userRepository.create({
      username: username,
      email: email,
      password: password,
      role: 'buyer',
    });

    return this.userRepository.save(user);
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    return user;
  }
}