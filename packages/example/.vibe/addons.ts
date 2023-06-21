import { outline, theme, controls } from "@snowytime/vibe/client";

export default [
    outline(),
    theme({ directive: "class" }),
    controls(),
    // resize({
    //     devices: [
    //         {
    //             name: "mobile",
    //             size: [400, 1000],
    //         },
    //     ],
    // }),
    // pointer(),
    // console(),
];
