import fs from "node:fs/promises";
import { join } from "node:path";

const extractRules = (cssContent: string) => {
    const rules = [];
    let count = 0;
    let start = 0;

    for (let i = 0; i < cssContent.length; i++) {
        if (cssContent[i] === "{") {
            count++;
        } else if (cssContent[i] === "}") {
            count--;
            if (count === 0) {
                rules.push(cssContent.slice(start, i + 1).trim());
                start = i + 1;
            }
        }
    }

    return rules;
};

// css handler plugin to inject css into the main head as needed
export default function cssPlugin(buildPath: string, mode: string) {
    return {
        name: "vibe-css-plugin",
        transformIndexHtml(html) {
            if (mode === "production") {
                return html.replace("--DEV--", `--BUILD--`);
            }
            return html;
        },
        async writeBundle() {
            await parse(buildPath);
            // 1. get stylesheets in index.html -> these are the vibe stylesheets
            // 2. for each one add data-indent="vibe"
            // 3. If stories are using vibe components, they will be included in the stories css imports in build
            // const buildLocation = join(process.cwd(), buildPath);
            // const htmlPath = join(buildLocation, "index.html");
            // // intent declarations
            // const vibeIntent = new VibeIntent({ buildLocation, htmlPath });
            // const universalIntent = new UniversalIntent({ buildLocation, htmlPath });
            // // intent parsers
            // await vibeIntent.parse();
            // await universalIntent.parse();
            // // intent closers
            // await vibeIntent.close();
            // await universalIntent.close();
        },
        // load(id: string) {
        //     if (id.includes(".css") || id.includes("scss")) {
        //         // add to the transform log
        //         stylesheets.push(id);
        //     }
        // },
        // transform(code: string, id: string) {
        //     if (stylesheets.includes(id)) {
        //         return {
        //             code: ``
        //         }
        //     }
        // },
    };
}

interface IntentProps {
    buildLocation: string;
    htmlPath: string;
}
class VibeIntent {
    styles = "";
    stylesheetPath: string;
    buildLocation: string;
    htmlPath: string;

    constructor({ buildLocation, htmlPath }: IntentProps) {
        this.buildLocation = buildLocation;
        this.htmlPath = htmlPath;
    }

    async handle(stylesheetPath: string) {
        const cssContent = await fs.readFile(stylesheetPath, "utf-8");
        const rules = extractRules(cssContent);

        const sanitizedSheet = rules.filter((rule) => rule && !rule.includes("use:vibe")).join("");
        const matches = rules.filter((rule) => rule && rule.includes("use:vibe"));
        if (!matches) return;
        // loop over instances
        for (const block of matches) {
            // each vibe item
            const cleanedBlock = block.replace(/\s+/g, " ").replace(/\\/g, "");
            // work with the cleaned block
            this.styles += cleanedBlock;
        }
        // update the original stylesheet with the current cssContent
        await fs.writeFile(stylesheetPath, sanitizedSheet, "utf-8");
    }

    async getHtml() {
        return fs.readFile(this.htmlPath, "utf-8");
    }

    async parse() {
        // handles all handling
        const currentHmtl = await this.getHtml();
        const linkTags = Array.from(currentHmtl.matchAll(/<link.*?href="(.*?)".*?>/gis));

        if (linkTags.length === 0) return;

        for (const linkTag of linkTags) {
            if (!linkTag[0].includes("stylesheet")) continue;

            const href = linkTag[1];

            // Read the stylesheet content
            const stylesheetPath = join(this.buildLocation, href);
            await this.handle(stylesheetPath);
        }
    }

    async close() {
        if (!this.styles) return;
        await fs.writeFile(join(this.buildLocation, "assets/vibe.css"), this.styles, "utf-8");
        const vibeLink = '<link rel="stylesheet" href="/assets/vibe.css" data-intent="vibe">';
        const currentHtmlState = await this.getHtml();
        const headClosingTag = "</head>";
        const insertPosition = currentHtmlState.indexOf(headClosingTag);

        if (insertPosition !== -1) {
            // Insert the <link> element at the desired position
            const updatedHtmlContent =
                currentHtmlState.slice(0, insertPosition) +
                vibeLink +
                currentHtmlState.slice(insertPosition);

            // Write the updated HTML content back to the file
            await fs.writeFile(this.htmlPath, updatedHtmlContent, "utf-8");
        }
    }
}

class UniversalIntent {
    styles = "";
    stylesheetPath: string;
    buildLocation: string;
    htmlPath: string;

    constructor({ buildLocation, htmlPath }: IntentProps) {
        this.buildLocation = buildLocation;
        this.htmlPath = htmlPath;
    }

    async handle(stylesheetPath: string) {
        const cssContent = await fs.readFile(stylesheetPath, "utf-8");
        const rules = extractRules(cssContent);

        const sanitizedSheet = rules
            .filter((rule) => rule && !rule.includes("use:universal"))
            .join("");
        const matches = rules.filter((rule) => rule && rule.includes("use:universal"));
        if (!matches) return;
        // loop over instances
        for (const block of matches) {
            // each vibe item
            const cleanedBlock = block.replace(/\s+/g, " ").replace(/\\/g, "");
            // work with the cleaned block
            this.styles += cleanedBlock;
        }
        // update the original stylesheet with the current cssContent
        await fs.writeFile(stylesheetPath, sanitizedSheet, "utf-8");
    }

    async getHtml() {
        return fs.readFile(this.htmlPath, "utf-8");
    }

    async parse() {
        // handles all handling
        const currentHmtl = await this.getHtml();
        const linkTags = Array.from(currentHmtl.matchAll(/<link.*?href="(.*?)".*?>/gis));

        for (const linkTag of linkTags) {
            if (!linkTag[0].includes("stylesheet")) continue;

            const href = linkTag[1];

            // Read the stylesheet content
            const stylesheetPath = join(this.buildLocation, href);
            await this.handle(stylesheetPath);
        }
    }

    async close() {
        if (!this.styles) return;
        await fs.writeFile(join(this.buildLocation, "assets/universal.css"), this.styles, "utf-8");
        const vibeLink =
            '<link rel="stylesheet" href="/assets/universal.css" data-intent="universal">';
        const currentHtmlState = await this.getHtml();
        const headClosingTag = "</head>";
        const insertPosition = currentHtmlState.indexOf(headClosingTag);

        if (insertPosition !== -1) {
            // Insert the <link> element at the desired position
            const updatedHtmlContent =
                currentHtmlState.slice(0, insertPosition) +
                vibeLink +
                currentHtmlState.slice(insertPosition);

            // Write the updated HTML content back to the file
            await fs.writeFile(this.htmlPath, updatedHtmlContent, "utf-8");
        }
    }
}

const parse = async (location: string) => {
    const buildLocation = join(process.cwd(), location);
    const htmlPath = join(buildLocation, "index.html");
    const getHtml = async () => {
        return fs.readFile(htmlPath, "utf-8");
    };

    const updatedHtml = async () => {
        const html = await getHtml();
        const updatedLinkTags = html.replace(
            /<link rel="stylesheet"/g,
            '<link rel="stylesheet" data-intent="vibe"',
        );

        return updatedLinkTags;
    };

    await fs.writeFile(htmlPath, await updatedHtml(), "utf-8");
};
