"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
var common_1 = require("@nestjs/common");
var zod_1 = require("zod");
var zod_validation_error_1 = require("zod-validation-error");
var ZodValidationPipe = /** @class */ (function () {
    function ZodValidationPipe(schema) {
        this.schema = schema;
    }
    ZodValidationPipe.prototype.transform = function (value) {
        try {
            return this.schema.parse(value);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                throw new common_1.BadRequestException({
                    message: 'Validation failed',
                    statusCode: 400,
                    errors: (0, zod_validation_error_1.fromZodError)(error),
                });
            }
            throw new common_1.BadRequestException('Validation failed');
        }
        return value;
    };
    return ZodValidationPipe;
}());
exports.ZodValidationPipe = ZodValidationPipe;
