import path, { isAbsolute, join } from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import reactPlugin from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import vibePlugin from "../plugin/vibe-plugin.js";
import { loadConfigFromFile } from "vite";
import { Config } from "@type/globals.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const getBase = async (
	configUpdate: any,
	vitePath: string | undefined,
	userConfig: Config
) => {
	// get the user configuration.
	// note that we NEED the tsconfigPaths and react plugins to be present.
	// the user may supply their own custom vite config that will be applied as well during dev, build, and start phases
	const { userViteConfig, hasTs, hasReact } = await getUserVite({
		path: vitePath,
		command: configUpdate.build ? "build" : "serve",
		mode: configUpdate.mode
	});
	const config = {
		...configUpdate,
		// we might support custom base in config at some point
		base: undefined,
		configFile: false,
		publicDir: join(process.cwd(), "public"),
		cacheDir: join(process.cwd(), "node_modules/.vite"),
		root: join(__dirname, "../../app/"),
		css: {
			postcss: process.cwd()
		},
		envDir: process.cwd(),
		resolve: {},
		optimizeDeps: {
			include: [
				"react",
				"react-dom",
				"react-dom/client",
				"@snowytime/vibe",
				"react-router-dom"
			],
			exclude: ["@swc/wasm", "@swc/core", "fsevents", "virtual:vibe"]
		},
		plugins: [
			!hasTs &&
				tsconfigPaths({
					root: process.cwd()
				}),
			vibePlugin(userConfig),
			// @ts-ignore
			!hasReact && reactPlugin()
		]
	};
	// merges them together
	return mergeViteConfigs(userViteConfig, config);
};

// vite retriever
const getUserVite = async ({
	path,
	command,
	mode
}: {
	path: string | undefined;
	command: "build" | "serve";
	mode: string;
}) => {
	// don't try to extract vite config if its not present
	if (!path) {
		return { hasTs: false, hasReact: false, userViteConfig: {} };
	}
	// this will get then user vite config from the `.vibe` directory
	const userViteConfig = await loadConfigFromFile({ command, mode }, path);
	if (!userViteConfig.config) {
		// return the basic stuff
		return { hasTs: false, hasReact: false, userViteConfig: {} };
	}
	const { config } = userViteConfig;
	// start resolving the content of the custom vite config
	if (config.publicDir) {
		config.publicDir = getPublicDir(config.publicDir);
	}
	if (config.cacheDir) {
		config.cacheDir = getCacheDir(config.cacheDir);
	}
	const hasReact = config.plugins
		? config.plugins.some((plugin) => {
				return Array.isArray(plugin)
					? plugin.some(
							(item) =>
								item &&
								// @ts-ignore
								item.name &&
								// @ts-ignore
								item.name.includes("vite:react-")
					  )
					: //@ts-ignore
					  plugin &&
							// @ts-ignore
							plugin.name &&
							// @ts-ignore
							plugin.name.includes("vite:react-");
		  })
		: false;
	const hasTs = config.plugins
		? config.plugins.some(
				//@ts-ignore
				(plugin) => plugin && plugin.name === "vite:tsconfig-paths"
		  )
		: false;

	// return the results of our gathering
	return { userViteConfig: config, hasTs, hasReact };
};

const getPublicDir = (publicDir: string) => {
	if (!publicDir) {
		return false;
	}
	if (isAbsolute(publicDir)) {
		return publicDir;
	}
	return join(process.cwd(), publicDir || "public");
};

const getCacheDir = (cacheDir: string) => {
	if (!cacheDir) {
		return join(process.cwd(), "node_modules/.vite");
	}
	if (isAbsolute(cacheDir)) {
		return cacheDir;
	}
	return join(process.cwd(), cacheDir);
};

// vite merger
const mergeViteConfigsRecursively = (userConfig, vibeViteConfig, rootPath) => {
	// utilities
	function arraify(target) {
		return Array.isArray(target) ? target : [target];
	}
	function isObject(value) {
		return Object.prototype.toString.call(value) === "[object Object]";
	}
	// method
	const merged = { ...userConfig };
	for (const key in vibeViteConfig) {
		//@ts-ignore
		const value = vibeViteConfig[key];
		if (value == null) {
			continue;
		}
		//@ts-ignore
		const existing = merged[key];
		if (existing == null) {
			//@ts-ignore
			merged[key] = value;
			continue;
		}
		if (Array.isArray(existing) || Array.isArray(value)) {
			//@ts-ignore
			merged[key] = [...arraify(existing ?? []), ...arraify(value ?? [])];
			continue;
		}
		if (isObject(existing) && isObject(value)) {
			//@ts-ignore
			merged[key] = mergeConfigRecursively(
				existing,
				value,
				rootPath ? `${rootPath}.${key}` : key
			);
			continue;
		}
		//@ts-ignore
		merged[key] = value;
	}
	return merged;
};

const mergeViteConfigs = (userConfig, vibeViteConfig, isRoot = true) => {
	return mergeViteConfigsRecursively(
		userConfig,
		vibeViteConfig,
		isRoot ? "" : "."
	);
};
