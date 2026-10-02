import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { StudentDocument } from 'src/student/schema/student.schema';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from 'src/student/student.service';
import { Student, StudentSchema } from 'src/student/schema/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HashServices } from 'src/common/utils/hash.utils';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    private readonly jwtService: JwtService,
    private readonly HashServices: HashServices
  ) {}

  async signIn(data: LoginDto): Promise<{ accessToken: string }> {

    const student = await this.studentModel.findOne({ email: data.email });

    if (!student) {
      throw new UnauthorizedException();
    }

    const isCorrect = await this.HashServices.verifyHash(data.password, student.password)

    if(!isCorrect) {
      throw new UnauthorizedException();
    }

    const payload = { user_id: student.id, email: student.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
