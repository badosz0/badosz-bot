module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "indent": ["error", 4, {"SwitchCase": 1}, {"allowIndentationTabs": true}],
        "quotes": 0,
        "semi": ["error", "always"],
        "no-multiple-empty-lines":["warn", {"max": 2, "maxEOF": 1}],
        "@typescript-eslint/ban-types": ["error", {
            "types": {
                "String": true,
                "Boolean": true,
                "Number": true,
                "Symbol": false,
                "{}": false,
                "Object": false,
                "object": false,
                "Function": true,
            },
            "extendDefaults": true
        }],
        "no-constant-condition": ["error", {"checkLoops": false}]
    }
}
