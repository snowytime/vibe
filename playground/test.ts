import path from "path";
import { exportResolve } from "../src/parsers/export-resolve.js";

const main = async () => {
    const stories = await exportResolve([path.join(process.cwd(), "playground/index.tsx")]);
    console.log(stories);
};

main();
