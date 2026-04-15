import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all courses response', () => {
    expect(service.getAllCourses()).toBe('Get All Courses - from Service');
  });

  it('should return course by id response', () => {
    expect(service.getCourseById('5')).toBe(
      'Get Course with ID: 5 - from Service',
    );
  });

  it('should return create course response', () => {
    expect(service.createCourse()).toBe('Create Course - from Service');
  });

  it('should return update course response', () => {
    expect(service.updateCourse('5')).toBe('Update Course 5 - from Service');
  });

  it('should return patch course response', () => {
    expect(service.patchCourse('5')).toBe('Patch Course 5 - from Service');
  });

  it('should return delete course response', () => {
    expect(service.deleteCourse('5')).toBe('Delete Course 5 - from Service');
  });
});
