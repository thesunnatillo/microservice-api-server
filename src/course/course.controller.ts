import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import {
  CreateCourseDto,
  DeleteCourseDto,
  GetAllDto,
  GetByIdDto,
  UpdateCourseDto,
} from '../globals/protos/core';
import { JwtAuthGuard } from '../guards/jwtauth.guard';
import { RolesGuard } from '../guards/roles.guards';
import { Roles } from '../decorators/roles.decorator';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @Roles('SuperAdmin')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  @Roles('SuperAdmin')
  update(@Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(updateCourseDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('del/:id')
  @Roles('SuperAdmin')
  delete(@Param() deleteCourseDto: DeleteCourseDto) {
    return this.courseService.deleteCourse(deleteCourseDto);
  }

  @Get('info/:id')
  getById(@Param() getByIdDto: GetByIdDto) {
    return this.courseService.getById(getByIdDto);
  }

  @Get('all')
  getAll(getAllDto: GetAllDto) {
    return this.courseService.getAll(getAllDto);
  }
}
