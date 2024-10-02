import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COURSE',
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../globals/protos/core.proto'),
          package: 'core',
          url: 'localhost:5001',
        },
      },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
