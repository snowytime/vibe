import { createRequire } from "node:module";

// this function is used ONLY for cases where commonjs is being used
// very highly likely this will be retired as we will completely drop
// support for commonjs
export const dynamicRequire = createRequire(import.meta.url);
