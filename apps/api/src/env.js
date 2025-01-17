"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
var zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    JWT_PRIVATE_KEY: zod_1.z.string(),
    JWT_PUBLIC_KEY: zod_1.z.string(),
    PORT: zod_1.z.coerce.number().optional().default(3333),
    HOST_EMAIL_SENDER: zod_1.z.string(),
    PORT_EMAIL_SENDER: zod_1.z.coerce.number(),
    USER_EMAIL_SENDER: zod_1.z.string().email(),
    PASS_EMAIL_SENDER: zod_1.z.string(),
    APP_NAME: zod_1.z.string(),
    API_URL: zod_1.z.string().url(),
    WEB_URL: zod_1.z.string().url(),
});
