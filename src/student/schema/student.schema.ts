import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';
export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({
    required: true,
    unique: true,
    default: () => randomUUID(),
    index: true,
  })
  id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
