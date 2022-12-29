#!/usr/bin/env node
import { Command } from "commander";
import { build, create, dev, start } from "./index.js";

const program = new Command("vibe");

// dev operation
program.command("dev").action(async () => {
	await dev();
});

// build operation
program.command("build").action(async () => {
	await build();
});

// start operation
program.command("start").action(async () => {
	await start();
});

// create operation
program.command("create").action(async () => {
	await create();
});

program.parse(process.argv);
