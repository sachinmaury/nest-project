import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Post()
  async add(@Body() data: StudentDto) {
    return this.StudentService.createStudent(data);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return this.StudentService.getAllStudent();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.StudentService.getStudent(id);
  }
}
