"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let CourseService = class CourseService {
    getAllCourses() {
        return {
            message: 'All courses fetched successfully',
            data: [],
        };
    }
    getCourseById(id) {
        return {
            message: 'Course fetched successfully',
            id,
        };
    }
    createCourse(dto) {
        return {
            message: 'Course created successfully',
            data: dto,
        };
    }
    updateCourse(id, dto) {
        return {
            message: 'Course updated successfully',
            id,
            data: dto,
        };
    }
    patchCourse(id, dto) {
        return {
            message: 'Course patched successfully',
            id,
            updatedFields: Object.keys(dto),
        };
    }
    deleteCourse(id) {
        return {
            message: 'Course deleted successfully',
            id,
        };
    }
    uploadCourseMaterial(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        if (!this.hasValidFileSignature(file)) {
            if ((0, fs_1.existsSync)(file.path)) {
                (0, fs_1.unlinkSync)(file.path);
            }
            throw new common_1.BadRequestException('Uploaded file content is invalid');
        }
        return {
            message: 'Material uploaded successfully',
            courseId: id,
            filename: file.filename,
            path: `uploads/${file.filename}`,
        };
    }
    hasValidFileSignature(file) {
        if (!file.path || !(0, fs_1.existsSync)(file.path)) {
            return false;
        }
        const header = (0, fs_1.readFileSync)(file.path).subarray(0, 8);
        const extension = (0, path_1.extname)(file.originalname || file.filename).toLowerCase();
        if (extension === '.pdf') {
            return (header.length >= 4 &&
                header[0] === 0x25 &&
                header[1] === 0x50 &&
                header[2] === 0x44 &&
                header[3] === 0x46);
        }
        if (extension === '.png') {
            return (header.length >= 8 &&
                header[0] === 0x89 &&
                header[1] === 0x50 &&
                header[2] === 0x4e &&
                header[3] === 0x47 &&
                header[4] === 0x0d &&
                header[5] === 0x0a &&
                header[6] === 0x1a &&
                header[7] === 0x0a);
        }
        if (extension === '.jpg' || extension === '.jpeg') {
            return (header.length >= 3 &&
                header[0] === 0xff &&
                header[1] === 0xd8 &&
                header[2] === 0xff);
        }
        return false;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)()
], CourseService);
//# sourceMappingURL=course.service.js.map