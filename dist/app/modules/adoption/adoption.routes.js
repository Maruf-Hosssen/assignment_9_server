"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const adoption_controller_1 = require("./adoption.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/adoption-request', (0, auth_1.default)(), adoption_controller_1.adoptionControllers.adoptionPet);
router.get('/adoption-requests', (0, auth_1.default)(), adoption_controller_1.adoptionControllers.getalladoption);
router.put('/adoption-requests/:requestId', (0, auth_1.default)(), adoption_controller_1.adoptionControllers.updateAdoption);
exports.adoptionRoutes = router;
