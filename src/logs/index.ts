import pico from "picocolors";

export const dev_logger = ({
	local,
	network,
	duration
}: {
	local: string;
	network?: string | null;
	duration: number;
}) => {
	console.clear();
	console.log(`
${pico.yellow("[dev]")} ${pico.cyan(pico.bold("Time to Vibe"))} ⚡️${pico.green(
		`ready in ${duration} ms`
	)}\n
${pico.dim("local:     ")}${pico.magenta(local)}
${pico.dim("network:   ")}${
		network
			? pico.magenta(network)
			: pico.dim("set expose to true in config")
	}\n
`);
};

// build
export const build_logger = ({
	duration,
	destination,
	stories
}: {
	duration: number;
	destination: string;
	stories: number;
}) => {
	console.clear();
	console.log(`
${pico.yellow("[build]")} ${pico.cyan(
		pico.bold("Vibe build successful")
	)} ⚡️${pico.green(`completed in ${duration} ms`)}\n
${`run ${pico.bgCyan(" npx vibe start ")} to run the build`}\n
${`✅ compiled ${pico.green(`${stories} stories`)} successfully`}
${`✅ saved in ${pico.cyan(destination)}`}
`);
};

// start
export const start_logger = ({
	local,
	network,
	duration
}: {
	local: string;
	network?: string | null;
	duration: number;
}) => {
	console.clear();
	console.log(`
${pico.green("[start]")} ${pico.cyan(
		pico.bold("Time to Vibe")
	)} ⚡️${pico.green(`ready in ${duration} ms`)}\n
${pico.dim("local:     ")}${pico.magenta(local)}
${pico.dim("network:   ")}${
		network
			? pico.magenta(network)
			: pico.dim("set expose to true in config")
	}\n
`);
};
