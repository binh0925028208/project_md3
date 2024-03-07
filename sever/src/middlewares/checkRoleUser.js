"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRoleUser = (req, res, next) => {
    console.log("đây là role", req.user);
    if (req.user.role == 1) {
        next();
    }
    else {
        res.status(403).json("Forbiden");
    }
};
exports.default = checkRoleUser;
