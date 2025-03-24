const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: ['./base.js', require.resolve('@vercel/style-guide/eslint/next')],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['import', 'only-warn'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
};
