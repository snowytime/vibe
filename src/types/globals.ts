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
}
export interface BuildReturn {
	status: string;
	duration: number;
	destination: string;
}
interface AddonData {
	stories: StoryData[];
	config: Config;
}
export interface Addon {
	dev: (data: AddonData) => Promise<ServerReturn>;
	build: (data: AddonData) => Promise<BuildReturn>;
	start: (data: AddonData) => Promise<ServerReturn>;
	create?: () => Promise<null>;
}
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
