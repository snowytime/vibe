import { getConfig } from "@config/get-config.js";
import { findBody } from "@finders/find-body.js";
import { findHead } from "@finders/find-head.js";
import { findStories } from "@finders/find-stories.js";
import { getStoryData } from "@parsers/together.js";
import { generateTree } from "@structures/generate-tree.js";
import { globby } from "globby";
import fs from "node:fs";
import path, { join } from "node:path";
import { fileURLToPath } from "node:url";
import { allImports } from "./all.js";

function cleanupWindowsPath(path: string) {
	return path.replace(/\\/g, "/");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function vibePlugin(config) {
	const virtualModuleId = "virtual:vibe";
	const resolvedVirtualModuleId = "\0" + virtualModuleId;
	return {
		name: "vibe-plugin",
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
			return null;
		},
		transformIndexHtml: {
			async transform(html: string, ctx: any) {
				if (ctx.path === "/index.html") {
					const [headHtmlPath] = await findHead();
					if (headHtmlPath) {
						const headHtml = fs.readFileSync(headHtmlPath, "utf8");
						html = html.replace("</head>", `${headHtml}</head>`);
					}
					const body = await findBody();
					if (body.length > 0) {
						// can either be before, or after
						body.forEach((entry: any) => {
							// @ts-ignore
							if (entry.split("/").at(-1).includes("before")) {
								const beforeCode = fs.readFileSync(
									entry,
									"utf8"
								);
								html = html.replace(
									"<body>",
									`<body>${beforeCode}`
								);
							}
							// @ts-ignore
							if (entry.split("/").at(-1).includes("after")) {
								const afterCode = fs.readFileSync(
									entry,
									"utf8"
								);
								html = html.replace(
									"</body>",
									`${afterCode}</body>`
								);
							}
						});
					}
				}
				return html;
			}
		},
		async transform(code: string, id: string) {
			// We instrument stories with a simple eventemitter like code so
			// some addons (like a11y) can subscribe to changes and re-run
			// on HMR updates
			if (id.includes(".stories.")) {
				const from = cleanupWindowsPath(
					path.join(__dirname, "../../app/src/hmr")
				);
				const watcherImport = `import { storyUpdated } from "${from}";`;
				// if stories are defined through .bind({}) we need to force full reloads since
				// react-refresh can't pick it up
				const invalidateHmr = code.includes(".bind({})")
					? `if (import.meta.hot) {
						import.meta.hot.on("vite:beforeUpdate", () => {
                            import.meta.hot.invalidate();
                        });
					}`
					: "";
				// make sure the `loaded` attr is set even if the story is loaded through iframe
				const setLoadedAttr = `typeof window !== 'undefined' &&
										window.document && window.document.createElement &&
										document.documentElement.setAttribute("data-storyloaded", "");`;
				return {
					code: `
						${code}\n${setLoadedAttr}\n${invalidateHmr}\n${watcherImport}\nif (import.meta.hot) {
							import.meta.hot.accept(() => {
								storyUpdated();
							});
						}`,
					map: null
				};
			}
			return { code, map: null };
		},
		async load(id: string) {
			if (id === resolvedVirtualModuleId) {
				try {
					// dynamic returns all the component lazy imports and related things
					const stories = await globby(config.stories);
					const fixedStories = stories.map((story) =>
						join(process.cwd(), story)
					);
					const storyData = await getStoryData(fixedStories);
					const storyTree = generateTree(storyData);
					const imports = await allImports(
						storyData,
						config,
						storyTree
					);
					// return the compiled imports
					return imports;
				} catch (e) {
					console.log(e);
				}
			}
		}
	};
}
