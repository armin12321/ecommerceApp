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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
var path_1 = __importDefault(require("path"));
var user_1 = __importDefault(require("../models/user"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var server_config_1 = require("../configs/server.config");
//functions:
var login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    //check if username exists
    user_1.default.findOne({
        username: username
    })
        .lean() //return json, instead of mongodb type.
        .then(function (user) {
        if (user) { //exists, check password:
            console.log(user); // to see what type is user.
            var passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
            if (!passwordIsValid) {
                res.json({
                    token: null,
                    success: false,
                    msg: 'Password is incorrect, please try again'
                });
            }
            else {
                var token = jsonwebtoken_1.default.sign({
                    username: user.username,
                    password: user.password,
                    email: user.email
                }, server_config_1.serverConfig.SECRET, { expiresIn: 86400 });
                res.json({
                    token: token,
                    success: true,
                    msg: 'Succesfuly logged in',
                    user: user
                });
            }
        }
        else { //does not exist, return error.
            res.json({
                token: null,
                success: false,
                msg: 'Username does nost exist, please try again'
            });
        }
    });
};
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var avatarName, success, msg, uploaded, user, sampleFile, ext, uploadPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = new user_1.default({
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    address: req.body.address,
                    type: req.body.type,
                    avatarName: 'default.jpg'
                });
                if (!req.files) return [3 /*break*/, 2];
                sampleFile = req.files.file;
                ext = path_1.default.extname(sampleFile.name);
                avatarName = req.body.username + ext;
                uploadPath = path_1.default.join(__dirname, '..', '/uploads/images/avatars/', avatarName);
                return [4 /*yield*/, sampleFile.mv(uploadPath, function (err) {
                        if (err) {
                            return res.json({
                                success: false,
                                msg: 'Something went wrong. Try again later'
                            });
                        }
                        else {
                            user.save();
                            return res.json({
                                success: true,
                                msg: 'User successfully registered. You can now log in'
                            });
                        }
                    })];
            case 1:
                uploaded = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                user.save();
                return [2 /*return*/, res.json({
                        success: true,
                        msg: 'User successfully registered. You can now log in'
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var cart = function (req, res) {
    var user = {
        username: req.username,
        password: req.password,
        email: req.email
    };
    console.log(user);
    res.json({
        msg: 'Here i am at my cart!!!',
        user: user
    });
};
var profile = function (req, res) {
    var user = {
        username: req.username,
        password: req.password,
        email: req.email
    };
    console.log(user);
    res.json({
        msg: 'Here i am at my profile page!!!',
        user: user
    });
};
var userController = {
    register: register,
    login: login,
    cart: cart,
    profile: profile
};
exports.userController = userController;
