# Finda - A Robust Frontend Foundation

<div align="center">
  <img src="https://via.placeholder.com/150" alt="Finda Logo" width="150" />
  <p>A frontend foundation with solid core capabilities, powerful performance, and clean architecture</p>
</div>

## Overview

Finda is a modern React frontend foundation designed for building high-performance, maintainable
enterprise applications. Built on the latest frontend technology stack, it provides a rich set of UI
components and functional modules, enabling developers to quickly build applications with a
professional look and user experience.

### Key Features

- **Modern Technology Stack**: Vite as the build tool, React 19+, MUI 7+, and React Router 7
- **Rich Component Library**: Integration of MUI's extensive component library, including data
  grids, charts, date pickers, and more
- **Theme Customization**: Comprehensive theming system supporting dark/light modes and custom
  themes
- **Routing System**: Lazy-loading routing system based on React Router 7, optimizing first-screen
  loading performance
- **Developer Experience**: Strict code standards, Git commit conventions, and automated lint
  toolchain

## Getting Started

### Requirements

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-organization/finda-starter.git
cd finda-starter

# Install dependencies
pnpm install

# Create environment variables file
cp .env.example .env
```

### Development

```bash
# Start the development server
pnpm dev
```

### Building

```bash
# Build for production
pnpm build

# Preview the production build
pnpm preview
```

## Project Structure

```
src/
├── components/      # Common components
├── pages/           # Page components and routes
├── theme/           # Theme configuration
├── App.tsx          # Application entry
└── main.tsx         # Rendering entry
```

## Technology Stack

- **Build Tool**: Vite 6
- **UI Framework**: React 19
- **UI Component Library**: MUI 7
- **Routing**: React Router 7
- **Form Handling**: React Hook Form + Zod
- **Type System**: TypeScript
- **Code Standards**: ESLint + Prettier
- **Git Standards**: Commitlint + Husky

## Features

- **Authentication System**: Login/registration flows
- **Layout System**: Responsive layouts with mobile support
- **Theme System**: Support for light/dark theme switching
- **Notification System**: Integrated material-ui-toaster
- **Settings Panel**: User personal settings
- **Data Visualization**: Integrated MUI Charts library
- **Drag and Drop**: Drag-and-drop sorting based on dnd-kit
- **Route Permissions**: Role-based access control

## Docker Support

The project provides Docker configuration for containerized deployment:

```bash
# Start with Docker Compose
docker-compose up
```

## Development Standards

The project adopts strict code and Git commit standards:

- **Code Standards**: See `LINT_USAGE.md`
- **Commit Standards**: See `COMMIT_CONVENTION.md`

## Contributing Guidelines

Contributions to the project are welcome through PRs or Issues. Before submitting code, please
ensure:

1. Code passes all lint checks
2. Commit messages conform to project standards
3. Features have appropriate test coverage

## License

[MIT License](LICENSE)
