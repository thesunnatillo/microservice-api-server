import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../globals/protos/auth.proto'),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
