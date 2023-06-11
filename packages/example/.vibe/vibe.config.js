import { outline } from "@snowytime/vibe/client";
import { msg } from "./test.js";

export default {
    devPort: "3001",
    addons: [outline({ msg })],
};
