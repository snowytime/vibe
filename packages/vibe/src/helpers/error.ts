interface VibeErrorConstructor {
    message: string;
}

export enum ErrorType {
    Finder = "Finder",
    Config = "Config",
    Cli = "Cli",
    Server = "Server",
    Plugin = "Plugin",
    Structure = "Structure",
    Generic = "Generic",
}

export abstract class VibeError extends Error {
    message: string;
    type: string;
    constructor(data: VibeErrorConstructor) {
        super(data.message);
        this.message = data.message;
    }
}

export class FinderError extends VibeError {
    type = ErrorType.Finder;
}

export class ConfigError extends VibeError {
    type = ErrorType.Config;
}

export class CliError extends VibeError {
    type = ErrorType.Cli;
}

export class ServerError extends VibeError {
    type = ErrorType.Server;
}

export class PluginError extends VibeError {
    type = ErrorType.Plugin;
}

export class StructureError extends VibeError {
    type = ErrorType.Structure;
}

export class GenericError extends VibeError {
    type = ErrorType.Generic;
}
