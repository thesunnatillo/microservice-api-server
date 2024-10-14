import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { CourseModule } from '@course/course.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
