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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Users {
    static signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // application/x-www-form-urlencoded method using
            const { email, password } = req.body;
            try {
                const existingUser = yield userModel_1.default.findOne({ email });
                if (!existingUser) {
                    return res.status(404).json({ message: "User doesn't exits." });
                }
                else {
                    const isPasswordCorrect = yield bcrypt.compare(password, existingUser.password);
                    if (!isPasswordCorrect) {
                        return res.status(400).json({ message: "Invalid Credentials." });
                    }
                    else {
                        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
                        return res.status(200).json({ result: existingUser, token });
                    }
                }
            }
            catch (e) {
                return res.status(500).json({ message: 'Something went wrong! Please try again later.' });
            }
        });
    }
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // application/x-www-form-urlencoded method using
            const { firstName, lastName, email, password, confirmPassword } = req.body;
            try {
                const existUser = yield userModel_1.default.findOne({ email });
                if (existUser)
                    return res.status(400).json({ message: "User already exist!" });
                if (password !== confirmPassword) {
                    return res.status(400).json({ message: "Password don't match" });
                }
                else {
                    const hashPassword = yield bcrypt.hash(password, 12);
                    const result = yield userModel_1.default.create({ name: `${firstName} ${lastName}`, email, password: hashPassword });
                    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
                    return res.status(200).json({ result, token });
                }
            }
            catch (e) {
                return res.status(500).json({
                    message: 'Something went wrong! Please try again later.'
                });
            }
        });
    }
}
exports.Users = Users;
