"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateInput = exports.blogCreateInput = exports.userUpdateInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importStar(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.userUpdateInput = zod_1.default.object({
    name: zod_1.default.string(),
    role: zod_1.default.string().optional().default(''),
    bio: zod_1.default.string().optional().default('')
});
exports.blogCreateInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    description: zod_1.default.string(),
    tags: zod_1.default.array((0, zod_1.string)())
});
exports.blogUpdateInput = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    tags: zod_1.default.array((0, zod_1.string)()).optional()
});
