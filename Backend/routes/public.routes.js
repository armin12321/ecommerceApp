"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoutes = void 0;
//third party packages
var express_1 = __importDefault(require("express"));
//controller
var public_controller_1 = require("../controllers/public.controller");
var publicRoutes = express_1.default.Router();
exports.publicRoutes = publicRoutes;
publicRoutes.post('/home', public_controller_1.publicController.home);
publicRoutes.get('/about', public_controller_1.publicController.about);
publicRoutes.post('/sellerInfo', public_controller_1.publicController.sellerInfo);
publicRoutes.post('/avatarImage', public_controller_1.publicController.avatarImage);
publicRoutes.post('/topProducts', public_controller_1.publicController.topProducts);
