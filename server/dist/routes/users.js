"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const users_1 = require("../controllers/users");
const router = express.Router();
router.post('/signin', users_1.Users.signin);
router.post('/signup', users_1.Users.signup);
exports.default = router;
