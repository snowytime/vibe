interface Story {
	component: string;
	url: string;
	path: string;
	id: string;
	storyName: string | undefined;
	name: string;
}
declare module "virtual:vibe" {
	import type { Category, Config } from "@snowytime/vibe";
	// eslint-disable-next-line
	const stories: Story[];
	const storyTree: Category[];
	const config: Config;
	const Entry: React.ElementType;
	const Context: any;
	export { stories, storyTree, config, Entry, Context };
}
