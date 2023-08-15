"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logReqDetails = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
require("dotenv/config");
const skipLogging = (req, res, next) => {
    next();
};
const logDetails = (req, res, next) => {
    const red = cli_color_1.default.red;
    const green = cli_color_1.default.bgGreen;
    const querry = cli_color_1.default.xterm(190).bgXterm(244);
    const path = cli_color_1.default.bgXterm(255).xterm(0);
    const method = req.method;
    const reqPath = req.path;
    const querrys = req.query;
    let querryString = "";
    let start = true;
    for (let key in querrys) {
        if (start) {
            querryString = `?${querryString}${querry(`${key}=${querrys[key]}`)}`;
            start = false;
        }
        else {
            querryString = `${querryString}&${querry(`${key}=${querrys[key]}`)}`;
        }
    }
    console.log(red("======================================="));
    console.log(`${green(method)}  ${path(`${reqPath}${querryString}`)}`);
    next();
};
const logReqDetails = (options) => {
    if ((options === null || options === void 0 ? void 0 : options.development) ||
        (options === null || options === void 0 ? void 0 : options.processEnv) === "development" ||
        process.env.NODE_ENV === "development") {
        return logDetails;
    }
    else
        return skipLogging;
};
exports.logReqDetails = logReqDetails;
