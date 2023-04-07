module.exports = {
    extends: ["@snowytime/standards/stylelint"],
    rules: {
        "order/properties-order": [["height", "width"]],
        "max-nesting-depth": 4,
    },
};
