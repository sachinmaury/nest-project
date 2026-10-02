import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Student, StudentDocument } from './schema/student.schema';
import { Model } from 'mongoose';
import { StudentInterface } from './interfaces/student.interface';
import { InjectModel } from '@nestjs/mongoose';
import { StudentDto } from './dto/student.dto';
import { HashServices } from 'src/common/utils/hash.utils';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
    private readonly hashServices: HashServices
  ) { }

  async getAllStudent(): Promise<StudentInterface[]> {
    return this.studentModel.find().exec();
  }

  async getStudent(id: string): Promise<StudentInterface | null> {
    return this.studentModel.findById(id).exec();
  }

  async createStudent(data: StudentDto): Promise<StudentInterface> {
    const student = await this.studentModel
      .findOne({ email: data.email })
      .exec();
    if (student) {
      throw new ConflictException('Email alredy exist');
    }

    const password = await this.hashServices.hashData(data.password)

    const createStudent = new this.studentModel({ ...data, password });
    return createStudent.save();
  }

  async getStudentByEmail(email: string): Promise<StudentInterface | null> {
    return this.studentModel.findOne({ email }).exec();
  }
}
