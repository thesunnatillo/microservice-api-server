import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COURSE',
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../global/protos/core.proto'),
          package: 'core',
          url: process.env.CORE_GRPC_URL,
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.AT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService, JwtStrategy],
})
export class CourseModule {}
