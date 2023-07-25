const importMap = new Map();

export default () => ({
    name: "vibe-build-plugin",
    async transform(code, id) {
        if (id.includes(".scss") || id.includes(".css")) {
            console.log({ id });
            // return nothing
            // return { code: "" };
        }
    },
});
