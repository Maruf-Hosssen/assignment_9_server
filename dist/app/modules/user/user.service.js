"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const appError_1 = require("../../error/appError");
const http_status_1 = __importDefault(require("http-status"));
const tokenHelper_1 = require("../../../shared/tokenHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//create user
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const hashpassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
    };
    const result = yield prisma_1.default.user.create({
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
//login user
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: data.email,
        },
    });
    const isPasswordCorrect = yield bcrypt.compare(data.password, userData.password);
    if (!isPasswordCorrect) {
        throw new appError_1.AppError(http_status_1.default.NOT_FOUND, 'Password does not matched');
    }
    const accessToken = tokenHelper_1.jwtHelpers.generateToken({ email: userData.email, password: userData.password }, 'access', '30d');
    return {
        userData,
        accessToken,
    };
});
//get single user
const getSingleUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jsonwebtoken_1.default.verify(token, 'access');
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: decodedToken.email,
        },
    });
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
//update user
const updateUser = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jsonwebtoken_1.default.verify(token, 'access');
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: decodedToken.email,
        },
    });
    const id = userData === null || userData === void 0 ? void 0 : userData.id;
    const result = yield prisma_1.default.user.update({
        where: {
            id: id,
        },
        data: data,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
exports.userServices = {
    createUser,
    loginUser,
    getSingleUser,
    updateUser,
};
