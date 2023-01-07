import pico from "picocolors";

export const devLogger = ({
    local,
    network,
    duration,
}: {
    local: string;
    network?: string | null;
    duration: number;
}) => {
    console.clear();
    console.log(`
${pico.yellow("[dev]")} ${pico.cyan(pico.bold("Time to Vibe"))} ⚡️\n
${pico.dim("local:     ")}${pico.magenta(local)}
${pico.dim("network:   ")}${
        network ? pico.magenta(network) : pico.dim("set expose to true in config")
    }\n
`);
};

// build
export const buildLogger = ({
    duration,
    destination,
}: {
    duration: number;
    destination: string;
}) => {
    console.clear();
    console.log(`
${pico.yellow("[build]")} ${pico.cyan(pico.bold("Vibe build successful"))} ⚡️${pico.green(
        `completed in ${duration.toFixed(0)} ms`,
    )}\n
${`run ${pico.bgCyan(" npx vibe start ")} to run the build`}\n
${`✅ saved in ${pico.cyan(destination)}`}
`);
};

export const createLogger = ({
    duration,
    destination,
    exists,
}: {
    duration: number;
    destination: string;
    exists: boolean;
}) => {
    console.clear();
    console.log(`
${pico.yellow("[create]")} ${pico.cyan(
        exists
            ? pico.yellow(pico.bold("Vibe already exists -- aborting"))
            : pico.bold("Vibe stuff created"),
    )} ⚡️${pico.green(`completed in ${duration.toFixed(0)} ms`)}\n
${`✅ setup in ${pico.cyan(destination)}`}
${`👋 Hint: Before you run ${pico.bgCyan(
    " npx vibe dev ",
)} remember to install your framework addon and put into the config !!!`}
`);
};

// start
export const startLogger = ({
    local,
    network,
    duration,
}: {
    local: string;
    network?: string | null;
    duration: number;
}) => {
    console.clear();
    console.log(`
${pico.green("[start]")} ${pico.cyan(pico.bold("Time to Vibe"))} ⚡️${pico.green(
        `ready in ${duration.toFixed(0)} ms`,
    )}\n
${pico.dim("local:     ")}${pico.magenta(local)}
${pico.dim("network:   ")}${
        network ? pico.magenta(network) : pico.dim("set expose to true in config")
    }\n
`);
};
