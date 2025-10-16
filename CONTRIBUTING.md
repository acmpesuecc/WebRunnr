# Contributing to WebRunnr

Thank you for your interest in contributing to WebRunnr! We welcome contributions from the community to help make this browser-based code execution platform even better.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Adding a New Language Executor](#adding-a-new-language-executor)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Questions](#questions)


## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a branch for your changes
5. Make your changes
6. Test your changes
7. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher
- Git
- A modern code editor (VS Code recommended)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/WebRunnr.git
cd WebRunnr

# Add upstream remote
git remote add upstream https://github.com/acmpesuecc/WebRunnr.git

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Running the Development Server

```bash
# Run the playground in development mode
pnpm --filter playground dev

# Build all packages in watch mode
pnpm dev
```

### Project Commands

```bash
# Build all packages
pnpm build

# Build for production
pnpm build:prod

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Clean build artifacts
pnpm clean
```

## Project Structure

WebRunnr is a monorepo managed with pnpm workspaces:

```
WebRunnr/
├── packages/
│   ├── core/           # Core API and execution orchestration
│   ├── js-executor/    # JavaScript executor
│   ├── ts-executor/    # TypeScript executor (Babel/standalone)
│   ├── py-executor/    # Python executor (Pyodide)
│   ├── java-executor/  # Java executor (TeaVM)
│   ├── cpp-executor/   # C++ executor
│   └── playground/     # Demo UI and playground
```

Each package is independently buildable and testable.

## How to Contribute

### Areas for Contribution

1. **Bug Fixes**: Fix issues reported in the issue tracker
2. **New Features**: Add new functionality or language support
3. **Documentation**: Improve docs, add examples, fix typos
4. **Testing**: Write tests, improve test coverage
5. **Performance**: Optimize execution speed or memory usage
6. **UI/UX**: Enhance the playground interface

### Contribution Workflow

1. **Find or Create an Issue**: Check existing issues or create a new one
2. **Get assigned**: Ask the maintainer to assign you on an issue
3. **Fork & Branch**: Create a feature branch from `main`
4. **Develop**: Write your code following our standards
5. **Test**: Ensure your changes work as expected
6. **Commit**: Use clear, descriptive commit messages
7. **Push**: Push your branch to your fork
8. **Pull Request**: Create a PR with a clear description

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Enable strict mode in `tsconfig.json`
- Provide proper type annotations
- Avoid using `any` unless absolutely necessary
- Use interfaces for object shapes
- Use enums for constant values


### Formatting

- Use proper indentation  
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Run `pnpm format` before committing

### Linting

- Run `pnpm lint` to check for issues
- Run `pnpm lint:fix` to auto-fix issues
- Fix all linting errors before submitting PR

## Testing Guidelines

### Manual Testing

1. Test your changes in the playground
2. Test with various code snippets
3. Test interactive input/output functionality
4. Test error handling and edge cases
5. Test in multiple browsers (Chrome, Firefox, Safari)


### Testing Checklist

- [ ] Code compiles without errors
- [ ] Linting passes
- [ ] Manual testing in playground
- [ ] Cross-browser testing (if UI changes)
- [ ] Input/output scenarios tested

## Commit Guidelines

### Commit Message Format

- Make sure to use conventional commits(SemVer Notations) for commit messages

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- To refer for more details: [https://www.conventionalcommits.org/en/v1.0.0/]


## Pull Request Process

### Before Submitting

1. Sync with upstream: `git pull upstream main`
2. Resolve any merge conflicts
3. Run `pnpm build` successfully
4. Run `pnpm lint` and fix issues
5. Run `pnpm format` to format code
6. Test your changes thoroughly

### PR Title

Use the same format as commit messages:

```
feat(core): add support for Go language
fix(ts-executor): correct compilation error handling
docs(contributing): add testing guidelines
```

### PR Description Template

- Checkout the PR_DESCRIPTION.md for PR templates.


## Questions

- **General Questions**: Open a discussion on GitHub Discussions
- **Bug Reports**: Create an issue with the bug report template
- **Feature Requests**: Create an issue with the enhancement template
- **Security Issues**: Email the maintainers directly

## Recognition

All contributors will be recognized in:
- GitHub contributors list
- Release notes (for significant contributions)
- Project documentation

Thank you for contributing to WebRunnr! 

---

**Maintained by HOMEBREW-EC-FOSS**
