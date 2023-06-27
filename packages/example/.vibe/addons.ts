import { outline, theme, controls, resize } from "@snowytime/vibe/client";

export default [
    outline(),
    theme({ directive: "class" }),
    controls(),
    resize()
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
