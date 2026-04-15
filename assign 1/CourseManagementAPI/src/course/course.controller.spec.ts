import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

describe('CourseController', () => {
  let controller: CourseController;
  let service: jest.Mocked<CourseService>;

  beforeEach(async () => {
    const serviceMock = {
      getAllCourses: jest.fn(),
      getCourseById: jest.fn(),
      createCourse: jest.fn(),
      updateCourse: jest.fn(),
      patchCourse: jest.fn(),
      deleteCourse: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get(CourseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate getAllCourses to service', () => {
    service.getAllCourses.mockReturnValue('Get All Courses - from Service');

    const result = controller.getAllCourses();

    expect(result).toBe('Get All Courses - from Service');
    expect(service.getAllCourses).toHaveBeenCalledTimes(1);
  });

  it('should delegate getCourseById to service', () => {
    service.getCourseById.mockReturnValue(
      'Get Course with ID: 5 - from Service',
    );

    const result = controller.getCourseById('5');

    expect(result).toBe('Get Course with ID: 5 - from Service');
    expect(service.getCourseById).toHaveBeenCalledWith('5');
  });

  it('should delegate createCourse to service', () => {
    service.createCourse.mockReturnValue('Create Course - from Service');

    const result = controller.createCourse();

    expect(result).toBe('Create Course - from Service');
    expect(service.createCourse).toHaveBeenCalledTimes(1);
  });

  it('should delegate updateCourse to service', () => {
    service.updateCourse.mockReturnValue('Update Course 5 - from Service');

    const result = controller.updateCourse('5');

    expect(result).toBe('Update Course 5 - from Service');
    expect(service.updateCourse).toHaveBeenCalledWith('5');
  });

  it('should delegate patchCourse to service', () => {
    service.patchCourse.mockReturnValue('Patch Course 5 - from Service');

    const result = controller.patchCourse('5');

    expect(result).toBe('Patch Course 5 - from Service');
    expect(service.patchCourse).toHaveBeenCalledWith('5');
  });

  it('should delegate deleteCourse to service', () => {
    service.deleteCourse.mockReturnValue('Delete Course 5 - from Service');

    const result = controller.deleteCourse('5');

    expect(result).toBe('Delete Course 5 - from Service');
    expect(service.deleteCourse).toHaveBeenCalledWith('5');
  });
});
