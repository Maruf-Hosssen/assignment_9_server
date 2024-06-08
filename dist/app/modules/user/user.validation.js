"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const user = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required!',
        }),
        email: zod_1.z.string({
            required_error: 'Species is required!',
        }),
        password: zod_1.z.string({
            required_error: 'Breed is required!',
        }),
        confirmPassword: zod_1.z.string({
            required_error: 'Breed is required!',
        }),
        role: zod_1.z.string({}).optional(),
    }),
});
exports.userValidation = {
    user,
};
