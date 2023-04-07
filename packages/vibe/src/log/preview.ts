import pico from "picocolors";

type Props = {
    local: string;
    network?: string;
    duration: number;
    stories: number;
};

export const previewLog = ({ local, network, stories, duration }: Props): void => {
    console.clear();
    console.log(`
${pico.yellow("[preview]")} ${pico.cyan(pico.bold("🔥 Only Good Vibes"))}\n
${pico.dim("local:     ")}${pico.magenta(local)}
${pico.dim("network:   ")}${
        network ? pico.magenta(network) : pico.dim("set expose to true in config")
    }\n
${pico.green(stories)} ${pico.dim("compiled in")} ${pico.green(`${duration.toFixed(2)}ms`)}\n
`);
};
