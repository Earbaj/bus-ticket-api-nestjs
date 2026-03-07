import { IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  age?: number;
}
