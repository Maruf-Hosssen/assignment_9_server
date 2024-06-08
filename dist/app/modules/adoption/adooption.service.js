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
exports.adoptionServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const adoptionPet = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, 'access');
    const email = decoded.email;
    const findUser = yield prisma_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    const adoptionData = {
        userId: findUser === null || findUser === void 0 ? void 0 : findUser.id,
        userName: findUser === null || findUser === void 0 ? void 0 : findUser.name,
        email: findUser === null || findUser === void 0 ? void 0 : findUser.email,
        petId: data === null || data === void 0 ? void 0 : data.petId,
        status: 'PENDING',
        petOwnershipExperience: data === null || data === void 0 ? void 0 : data.petOwnershipExperience,
    };
    const result = yield prisma_1.default.adoptionRequest.create({
        data: adoptionData,
    });
    return result;
});
//get all pet adoption
const getalladoption = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.adoptionRequest.findMany();
    return result;
});
//update adoption
const updateAdoption = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.adoptionRequest.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.adoptionRequest.update({
        where: {
            id: id,
        },
        data: data,
        select: {
            id: true,
            userId: true,
            petId: true,
            status: true,
            petOwnershipExperience: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
exports.adoptionServices = {
    adoptionPet,
    getalladoption,
    updateAdoption,
};
