#!/usr/bin/env node
import { Command } from "commander";
import { dev } from "./dev.js";
import { build } from "./build.js";
import { preview } from "./preview.js";

const program = new Command("vibe");

program.command("dev").action(async () => {
    await dev();
});

program.command("build").action(async () => {
    await build();
});

program.command("preview").action(async () => {
    await preview();
});

program.parse(process.argv);
