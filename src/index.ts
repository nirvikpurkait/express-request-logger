import { NextFunction, Request, Response } from "express";
import clc from "cli-color";
import "dotenv/config";

interface EnvOptions {
	development?: boolean;
	processEnv?: string | "development";
}

type LogReqDetails = (req: Request, res: Response, next: NextFunction) => void;

const skipLogging: LogReqDetails = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	next();
};

const logDetails: LogReqDetails = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const red = clc.red;
	const green = clc.bgGreen;
	const querry = clc.xterm(190).bgXterm(244);
	const path = clc.bgXterm(255).xterm(0);

	const method = req.method;
	const reqPath = req.path;
	const querrys = req.query;

	let querryString = "";
	let start = true;

	for (let key in querrys) {
		if (start) {
			querryString = `?${querryString}${querry(
				`${key}=${querrys[key]}`
			)}`;
			start = false;
		} else {
			querryString = `${querryString}&${querry(
				`${key}=${querrys[key]}`
			)}`;
		}
	}

	console.log(red("======================================="));
	console.log(`${green(method)}  ${path(`${reqPath}${querryString}`)}`);

	next();
};

const logReqDetails = (options?: EnvOptions) => {
	if (
		options?.development ||
		options?.processEnv === "development" ||
		process.env.NODE_ENV === "development"
	) {
		return logDetails;
	} else return skipLogging;
};

export { logReqDetails };
