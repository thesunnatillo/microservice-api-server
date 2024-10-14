import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COURSE',
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../global/protos/core.proto'),
          package: 'core',
          url: 'localhost:5001',
        },
      },
    ]),
    JwtModule.register({
      secret: 'ac-scrt',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService, JwtStrategy],
})
export class CourseModule {}
