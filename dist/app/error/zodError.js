"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorDetails = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const er = errorDetails.map((el) => el.message);
    const statusCode = 400;
    return {
        statusCode,
        message: 'zod validation error',
        errorMessage: er[0],
        errorDetails,
    };
};
exports.default = handleZodError;
