import { NextFunction, Request, Response } from "express";
import "dotenv/config";
interface EnvOptions {
    development?: boolean;
    processEnv?: string | "development";
}
type LogReqDetails = (req: Request, res: Response, next: NextFunction) => void;
declare const logReqDetails: (options?: EnvOptions) => LogReqDetails;
export { logReqDetails };
