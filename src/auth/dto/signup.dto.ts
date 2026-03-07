// src/auth/dto/signup.dto.ts
import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsNumber()
  @IsOptional() 
  @Min(0)
  @Type(() => Number)  // Add this to transform string to number
  age?: number;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}