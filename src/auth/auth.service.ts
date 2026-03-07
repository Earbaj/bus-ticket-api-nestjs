import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  async signup(signUpDto: SignUpDto) {
  // Destructure all fields from DTO
  const { email, password, name, phone, gender, age, role } = signUpDto;

  console.log('Received signup data:', { email, name, phone, gender, age, role }); // Debug log

  // Check if user already exists
  const existingUser = await this.usersService.findByEmail(email);
  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user with all fields
  const userData: any = {
    email,
    password: hashedPassword,
    name,
    role: role || 'user',
  };

  // Only add optional fields if they exist
  if (phone) userData.phone = phone;
  if (gender) userData.gender = gender;
  if (age) userData.age = age;

  const user = await this.usersService.create(userData);

  // Generate JWT token
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  return {
    message: 'User created successfully',
    access_token: this.jwtService.sign(payload),
    data: {
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      gender: user.gender,
      age: user.age,
      role: user.role,
    },
  };
}
  async login(email: string, password: string) {

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      data:payload
    };
  }

}
