#!/usr/bin/env node
import { getConfig } from "#config/get-config.js";
import { Command } from "commander";
import { build, create, dev, start } from "./index.js";

const program = new Command("vibe");

// dev operation
program.command("dev").action(async () => {
	const config = await getConfig();
	await dev(config);
});

// build operation
program.command("build").action(async () => {
	const config = await getConfig();
	await build(config);
});

// start operation
program.command("start").action(async () => {
	const config = await getConfig();
	await start(config);
});

// create operation
program.command("create").action(async () => {
	await create();
});

program.parse(process.argv);
