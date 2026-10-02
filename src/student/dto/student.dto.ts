import { IsEmail, IsString } from 'class-validator';
import { Transform } from "class-transformer";
import { HashServices } from 'src/common/utils/hash.utils';

export class StudentDto {
  @IsString()
  name!: string;
  
  @IsEmail()
  email!: string;
  
  @IsString()
  password!: string;
}
