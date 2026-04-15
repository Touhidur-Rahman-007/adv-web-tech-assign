"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
let MulterExceptionFilter = class MulterExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        const isMulterSizeError = exception instanceof multer_1.MulterError && exception.code === 'LIMIT_FILE_SIZE';
        const isPayloadTooLargeError = exception instanceof common_1.PayloadTooLargeException ||
            (exception instanceof common_1.HttpException &&
                exception.getStatus() === common_1.HttpStatus.PAYLOAD_TOO_LARGE);
        if (isMulterSizeError || isPayloadTooLargeError) {
            response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'File too large. Maximum allowed size is 2MB',
                error: 'Bad Request',
            });
            return;
        }
        response.status(common_1.HttpStatus.BAD_REQUEST).json({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: exception instanceof Error ? exception.message : 'File upload failed',
            error: 'Bad Request',
        });
    }
};
exports.MulterExceptionFilter = MulterExceptionFilter;
exports.MulterExceptionFilter = MulterExceptionFilter = __decorate([
    (0, common_1.Catch)(multer_1.MulterError, common_1.PayloadTooLargeException)
], MulterExceptionFilter);
//# sourceMappingURL=multer-exception.filter.js.map