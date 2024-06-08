"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
//create user
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.createUser(req);
    const userData = result.result;
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            token: result.accessToken,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        },
    });
}));
//login user
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.loginUser(req.body);
    const userData = result.userData;
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Logged in successfully',
        data: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            token: result.accessToken,
        },
    });
}));
//get single user
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield user_service_1.userServices.getSingleUser(token);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'User profile retrieved successfully',
        data: {
            id: result === null || result === void 0 ? void 0 : result.id,
            name: result === null || result === void 0 ? void 0 : result.name,
            email: result === null || result === void 0 ? void 0 : result.email,
            role: result === null || result === void 0 ? void 0 : result.role,
        },
    });
}));
//get all users
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUsers(req.headers.authorization);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Retrive all user successfully',
        data: result,
    });
}));
//update user
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield user_service_1.userServices.updateUser(token, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User profile updated successfully',
        data: result,
    });
}));
exports.userControllers = {
    createUser,
    loginUser,
    getSingleUser,
    updateUser,
    getAllUsers,
};
