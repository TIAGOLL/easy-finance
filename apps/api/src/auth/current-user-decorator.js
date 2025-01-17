"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
var common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)(function (_, context) {
    var user = context.switchToHttp().getRequest().user;
    return user;
});
