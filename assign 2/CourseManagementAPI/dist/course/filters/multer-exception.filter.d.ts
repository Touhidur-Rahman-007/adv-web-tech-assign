import { ArgumentsHost, ExceptionFilter, PayloadTooLargeException } from '@nestjs/common';
import { MulterError } from 'multer';
export declare class MulterExceptionFilter implements ExceptionFilter {
    catch(exception: MulterError | PayloadTooLargeException, host: ArgumentsHost): void;
}
