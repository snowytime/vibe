import pico from "picocolors";

type Props = {
    duration: number;
    stories: number;
    destination: string;
};

export const buildLog = ({ stories, duration, destination }: Props): void => {
    console.clear();
    console.log(`
${pico.yellow("[build]")} ${pico.cyan(pico.bold("🔥 Only Good Vibes"))}\n
${pico.green(stories)} ${pico.dim("built in")} ${pico.green(`${duration}ms`)}\n
${pico.dim("Destination:")} ${pico.magenta(destination)}
`);
};
