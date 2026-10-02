import { Module } from '@nestjs/common';
``;
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { HashServices } from 'src/common/utils/hash.utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
  providers: [StudentService,HashServices],
  controllers: [StudentController],
})
export class StudentModule {}
