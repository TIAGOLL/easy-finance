"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var env_1 = require("../src/env");
var auth_module_1 = require("./auth/auth.module");
var get_profile_controller_1 = require("./controllers/auth/get-profile.controller");
var request_password_recover_controller_1 = require("./controllers/auth/request-password-recover.controller");
var reset_password_controller_1 = require("./controllers/auth/reset-password.controller");
var sign_in_with_email_and_password_controller_1 = require("./controllers/auth/sign-in-with-email-and-password.controller");
var sign_in_with_google_controller_1 = require("./controllers/auth/sign-in-with-google.controller");
var sign_up_with_email_and_password_controller_1 = require("./controllers/auth/sign-up-with-email-and-password.controller");
var create_task_controller_1 = require("./controllers/tasks/create-task.controller");
var delete_task_controller_1 = require("./controllers/tasks/delete-task.controller");
var finish_task_controller_1 = require("./controllers/tasks/finish-task.controller");
var get_finished_tasks_controller_1 = require("./controllers/tasks/get-finished-tasks.controller");
var get_pending_tasks_controller_1 = require("./controllers/tasks/get-pending-tasks.controller");
var get_tasks_by_id_controller_1 = require("./controllers/tasks/get-tasks-by-id.controller");
var put_tasks_controller_1 = require("./controllers/tasks/put-tasks.controller");
var mail_sender_service_1 = require("./mail/mail-sender.service");
var prisma_service_1 = require("./prisma/prisma.service");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    validate: function (env) { return env_1.envSchema.parse(env); },
                    isGlobal: true,
                }),
                auth_module_1.AuthModule,
            ],
            controllers: [
                sign_in_with_email_and_password_controller_1.SignInWithEmailAndPasswordController,
                sign_up_with_email_and_password_controller_1.SignUpWithEmailAndPasswordController,
                create_task_controller_1.CreateTaskController,
                request_password_recover_controller_1.requestPasswordRecoverController,
                reset_password_controller_1.resetPasswordController,
                get_finished_tasks_controller_1.GetFinishedTaksController,
                get_profile_controller_1.GetProfileController,
                delete_task_controller_1.DeleteTask,
                get_tasks_by_id_controller_1.GetTaskById,
                finish_task_controller_1.FinishTaskController,
                put_tasks_controller_1.PutTasksController,
                get_pending_tasks_controller_1.GetPendingTaksController,
                sign_in_with_google_controller_1.SignInWithGoogle,
            ],
            providers: [prisma_service_1.PrismaService, mail_sender_service_1.MailSenderService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
