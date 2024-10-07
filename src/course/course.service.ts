import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  COURSES_SERVICE_NAME,
  CoursesServiceClient,
  CreateCourseDto,
  DeleteCourseDto,
  GetAllDto,
  GetByIdDto,
  UpdateCourseDto,
} from '../globals/protos/core';

@Injectable()
export class CourseService implements OnModuleInit {
  private courseServiceClient: CoursesServiceClient;
  constructor(@Inject('COURSE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.courseServiceClient =
      this.client.getService<CoursesServiceClient>(COURSES_SERVICE_NAME);
  }

  createCourse(createCourseDto: CreateCourseDto) {
    return this.courseServiceClient.create(createCourseDto);
  }
  updateCourse(updateCourseDto: UpdateCourseDto) {
    return this.courseServiceClient.update(updateCourseDto);
  }
  deleteCourse(deleteCourseDto: DeleteCourseDto) {
    return this.courseServiceClient.delete(deleteCourseDto);
  }
  getById(getByIdDto: GetByIdDto) {
    return this.courseServiceClient.getById(getByIdDto);
  }
  getAll(getAllDto: GetAllDto) {
    return this.courseServiceClient.getAll(getAllDto);
  }
}
