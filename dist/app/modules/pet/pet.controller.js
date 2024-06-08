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
exports.petControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pet_service_1 = require("./pet.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pet_constant_1 = require("./pet.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
//add pet
const addPet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_service_1.petServices.addPet(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Pet added successfully',
        data: result,
    });
}));
//update pet
const updatePet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.petId;
    const body = req.body;
    const result = yield pet_service_1.petServices.updatePet(id, body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Pet profile updated successfully',
        data: result,
    });
}));
// get all pet
const getAllPets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(req.query, pet_constant_1.petFilterableFields);
    const option = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield pet_service_1.petServices.getAllPets(filter, option);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Pets retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
//get single pet
const getSinglePet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.petId;
    const result = yield pet_service_1.petServices.getSinglePet(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Pet details retrived successfully',
        data: result,
    });
}));
exports.petControllers = {
    addPet,
    updatePet,
    getAllPets,
    getSinglePet,
};
