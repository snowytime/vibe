export interface StoryData {
	url: string;
	path: string;
	id: string;
	componentName: string;
	storyName?: string;
	meta?: {
		[key: string]: string | { [key: string]: string };
	};
}

export interface ServerReturn {
	local: string;
	network?: string;
	duration: number;
	stories: number;
}
export interface BuildReturn {
	stories: number;
	duration: number;
	destination: string;
}
export interface CreateReturn {
	duration: number;
	destination: string;
}
export interface Addon {
	dev: () => Promise<ServerReturn>;
	build: () => Promise<BuildReturn>;
	start: () => Promise<ServerReturn>;
	create?: () => Promise<CreateReturn>;
}
export type AddonDeclaration = (args?: unknown) => {
	dev: () => Promise<ServerReturn>;
	build: () => Promise<BuildReturn>;
	start: () => Promise<ServerReturn>;
	create?: () => Promise<null>;
};

export interface Config {
	port: number | number[];
	preview: number | number[];
	out: string;
	stories: string | string[];
	defaultStory: string | null;
	entry: string;
	expose: boolean;
	website: string;
	repo: string;
	version: string;
	addon: Addon;
}

export interface JsonStructure {
	website: string;
	repo: string;
	version: string;
	stories: {
		[key: string]: StoryData;
	};
}
