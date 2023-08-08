module.exports = {
    extends: [
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["react", "@typescript-eslint", "jest"],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
        project: "./tsconfig.json",
    },
    rules: {
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "no-restricted-imports": [
            "error",
            {
                patterns: [".*"],
            },
        ],
        "arrow-body-style": ["error", "as-needed"],
        "no-confusing-arrow": 0,
        "no-restricted-syntax": 0,
        "guard-for-in": 0,
        "class-methods-use-this": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "react/no-danger": 0,
        "react/prop-types": 0,
        "react/jsx-filename-extension": 0,
        "react/self-closing-comp": ["error", { component: true, html: true }],
        "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
        "import/extensions": 0,
        "import/prefer-default-export": 0,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "react-hooks/exhaustive-deps": "error",
        "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
};
