interface VibeErrorConstructor {
	message: string;
	status?: number;
}

export enum AppErrorType {
	Finder = "Finder",
	NotFound = "NotFound",
	MissingArgument = "MissingArgument",
	InvalidSession = "InvalidSession",
	ServiceError = "ServiceError",
	InvalidArgument = "InvalidArgument",
	NotPermitted = "NotPermitted",
	GenericError = "GenericError",
	ValidationError = "ValidationError"
}

export abstract class VibeError extends Error {
	message: string;
	status!: number;
	type!: string;
	constructor(data: VibeErrorConstructor) {
		super(data.message);
		this.message = data.message;
	}
}

export class FinderError extends VibeError {
	type = AppErrorType.Finder;
	status = 400;
}

export class NotFound extends VibeError {
	type = AppErrorType.NotFound;

	status = 400;
}

export class MissingArgument extends VibeError {
	type = AppErrorType.MissingArgument;

	status = 400;
}

export class InvalidSession extends VibeError {
	type = AppErrorType.InvalidSession;

	status = 400;
}

export class ServiceError extends VibeError {
	type = AppErrorType.ServiceError;

	status = 400;
}

export class InvalidArgument extends VibeError {
	type = AppErrorType.InvalidArgument;

	status = 400;
}

export class NotPermitted extends VibeError {
	type = AppErrorType.NotPermitted;

	status = 403;
}

export class GenericError extends VibeError {
	type = AppErrorType.GenericError;

	status = 500;
}
