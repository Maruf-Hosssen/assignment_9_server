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
exports.adoptionControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const adooption_service_1 = require("./adooption.service");
const adoptionPet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const data = req.body;
    const result = yield adooption_service_1.adoptionServices.adoptionPet(token, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Adoption request submitted successfully',
        data: result,
    });
}));
//get all adoption
const getalladoption = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adooption_service_1.adoptionServices.getalladoption();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Adoption requests retrieved successfully',
        data: result,
    });
}));
//update adoption
const updateAdoption = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.requestId;
    const data = req.body;
    const result = yield adooption_service_1.adoptionServices.updateAdoption(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Adoption request updated successfully',
        data: result,
    });
}));
exports.adoptionControllers = {
    adoptionPet,
    getalladoption,
    updateAdoption,
};
