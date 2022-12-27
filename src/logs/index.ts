// [NOTE] This service is what we use for logging things to the console (present in production)

import pico from "picocolors";

interface MainLoggerProps {
	local: string;
	network?: string;
}
export const dev_logger = ({ local, network }: MainLoggerProps) => {
	console.clear();
	console.log(`
${pico.green(`Lets Vibe 🔥 -- ${pico.yellow("dev")}`)}
${pico.green("➜")} local:    ${pico.cyan(local)}
${pico.dim(pico.green("➜"))} ${pico.dim("network:")}  ${
		network
			? `${pico.cyan(network)}`
			: pico.dim("set expose to true in config to enable")
	}
${pico.dim(`
- press o to open in the browser
- press q to quit
`)}
`);
};
