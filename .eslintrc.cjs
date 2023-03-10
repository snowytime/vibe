module.exports = {
    extends: [require.resolve("@snowytime/standards/eslint")],
    env: {
        mocha: true,
    },
    rules: {
        "arrow-body-style": "off",
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "no-plusplus": "off",
        "no-return-assign": "off",
        "import/no-extraneous-dependencies": "off",
        "no-continue": "off",
        "no-nested-ternary": "off",
        "max-classes-per-file": "off",
        "no-shadow": "off",
        "lines-between-class-members": "off",
        "no-use-before-define": "off",
        "no-prototype-builtins": "off",
        "no-restricted-syntax": "off",
        "no-await-in-loop": "off",
        "react/jsx-no-useless-fragment": "off",
    },
};
