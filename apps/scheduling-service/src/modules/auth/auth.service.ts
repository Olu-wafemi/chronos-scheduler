import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResponse } from './models/auth.model';
import { LoginInput } from './dto/login.input';
import { User } from '@prisma/client';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService,
    private primsa: PrismaService,
  ) {}

  private generateToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.primsa.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      console.log(user);
      return result;
    }

    return null;
  }
  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.validateUser(loginInput.email, loginInput.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);
    return {
      token,
      user,
    };
  }

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.primsa.user.findUnique({
      where: { email: registerInput.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(registerInput.password, 10);
    const newUser = await this.primsa.user.create({
      data: {
        email: registerInput.email,
        password: hashedPassword,
        name: registerInput.name,
        timeZone: registerInput.timeZone || 'UTC',
        username: registerInput.username,
      },
    });

    const { password, ...userResult } = newUser;
    const token = this.generateToken(newUser);
    return {
      token,
      user: userResult,
    };
  }
}
