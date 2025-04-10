# Git Commit Convention

This project uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
specification to ensure uniformity and readability of Git commit messages.

## Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

Must be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes (e.g., README, CHANGELOG, etc.)
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries
- `revert`: Revert to a previous version

### Scope (Optional)

The scope can be anything specifying the place of the commit change. For example, component name,
file name, module name, etc.

### Examples

```
feat(auth): add user login functionality
```

```
fix(ui): fix button display issue on mobile devices
```

```
docs: update installation instructions in README
```

```
style: format code, add semicolons
```

```
refactor(api): restructure user data retrieval logic
```

```
perf: improve image loading performance
```

```
test: add unit tests for user login
```

```
chore: update dependency versions
```

```
revert: revert to version 123abc
```

## Commitlint

This project uses `commitlint` and `husky` to automatically check if commit messages comply with the
convention. If they don't, the commit will be rejected.
