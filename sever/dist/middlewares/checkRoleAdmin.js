"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRoleAdmin = (req, res, next) => {
    console.log("đây là role", req.admin);
    if (req.admin.role == 2) {
        next();
    }
    else {
        res.status(403).json("Forbiden");
    }
};
exports.default = checkRoleAdmin;
