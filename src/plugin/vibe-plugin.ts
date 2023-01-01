import { findBody } from "@finders/find-body.js";
import { findFolder } from "@finders/find-folder.js";
import { findHead } from "@finders/find-head.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getVibeData } from "../main/index.js";
import { allImports } from "./all.js";

function cleanupWindowsPath(path: string) {
	return path.replace(/\\/g, "/");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function vibePlugin() {
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
					const [folder] = await findFolder();
					const [headHtmlPath] = await findHead(folder);
					if (headHtmlPath) {
						const headHtml = fs.readFileSync(headHtmlPath, "utf8");
						html = html.replace("</head>", `${headHtml}</head>`);
					}
					const body = await findBody(folder);
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
					const { stories, storyTree, config } = await getVibeData();
					const imports = await allImports(
						stories,
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
