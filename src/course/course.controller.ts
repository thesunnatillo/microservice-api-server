import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import {
  CreateCourseDto,
  DeleteCourseDto,
  UpdateCourseDto,
} from '../globals/protos/core';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Patch('update/:id')
  update(@Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(updateCourseDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') deleteCourseDto: DeleteCourseDto) {
    return this.courseService.deleteCourse(deleteCourseDto);
  }
}
