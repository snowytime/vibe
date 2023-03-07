#!/usr/bin/env node
import { Command } from "commander";
import { getConfig } from "#config/get-config.js";
import { build, create, dev, start } from "./index.js";

const program = new Command("vibe");

// dev operation
program.command("dev").action(async () => {
    const config = await getConfig();
    await dev({ mode: "development", ...config });
});

// build operation
program.command("build").action(async () => {
    const config = await getConfig();
    await build({ mode: "production", ...config });
});

// start operation
program.command("start").action(async () => {
    const config = await getConfig();
    await start({ mode: "production", ...config });
});

// create operation
program.command("create").action(async () => {
    await create();
});

program.parse(process.argv);
