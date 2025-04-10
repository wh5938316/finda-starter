# ESLint Usage Guide

This project uses ESLint to ensure code quality and maintain consistent coding standards.

## Available Commands

### Check for Linting Issues

Run the following command to check for linting issues across the project:

```bash
pnpm lint
# or
npm run lint
```

This will check all JavaScript and TypeScript files in the project for lint errors and warnings.

### Automatically Fix Issues

Run the following command to automatically fix linting issues where possible:

```bash
pnpm lint:fix
# or
npm run lint:fix
```

This will attempt to automatically fix all fixable issues in JavaScript and TypeScript files.

## Special Features

### Unused Imports Detection

The project is configured to automatically detect and remove unused imports. This helps keep the
codebase clean and can improve performance by reducing unnecessary code.

- When running `pnpm lint`, ESLint will warn about unused imports
- When running `pnpm lint:fix`, ESLint will automatically remove unused imports
- The pre-commit hook will automatically remove unused imports from staged files

Example:

```typescript
// Before
import React from 'react';
import { Button, Typography } from '@mui/material';
import { formatDate } from '../../utils/dateUtils';

function MyComponent() {
  // Only Button is used, Typography and formatDate are not
  return <Button>Click me</Button>;
}

// After lint:fix
import React from 'react';
import { Button } from '@mui/material';

function MyComponent() {
  return <Button>Click me</Button>;
}
```

## Pre-commit Hook

This project has a pre-commit hook that automatically runs ESLint (and Prettier) on staged files
before each commit. This helps ensure that only clean code gets committed to the repository.

The pre-commit hook uses lint-staged to:

1. Run ESLint with auto-fixing on staged JS/TS files
2. Run Prettier on staged JS/TS/JSON/MD files

If there are any linting issues that cannot be automatically fixed, the commit will be aborted with
an error message.

## ESLint Configuration

The ESLint configuration is defined in `.eslintrc.json` at the root of the project. It extends
several widely-used configurations:

- Airbnb's JavaScript style guide
- TypeScript ESLint rules
- React-specific rules
- Accessibility (jsx-a11y) rules
- And more

## Common ESLint Commands

### Check a Specific File

```bash
pnpm lint path/to/file.ts
```

### Check a Specific Directory

```bash
pnpm lint src/components/
```

### Run ESLint with Specific Rules Disabled

```bash
pnpm lint --rule "no-console: 0" src/
```

### Show Only Errors (No Warnings)

```bash
pnpm lint --quiet
```

## Integration with VS Code

For VS Code users, we recommend installing the ESLint extension to see linting errors directly in
the editor:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "ESLint" and install the extension by Microsoft
4. Reload VS Code

The extension will automatically use the project's ESLint configuration.
