# WebRunnr

A browser-based code execution platform that runs multiple programming languages directly in the browser without server-side compilation.
It provides sandboxed execution environments for JavaScript, TypeScript, Python, and Java with interactive input/output support.

WebRunnr allows developers, educators, and students to write, execute, and test code snippets in various programming languages entirely within the browser, eliminating the need for local development environments or server infrastructure.

## Mentees:  
Bhuvan M S (SysRet8-BMS)  
Chatresh Ramasai Gudi (ChatreshGudi)  
Chiranjeevi Rao (nostorian)  
Ishan Pandey (Nightwing000)  
Nishant Jayaram Hegde (Nishant9Hegde)  
Rehaan Jose Mathew (Rex-8)

## Mentors:
Achyuth Yogesh Sosale (achyuthcodes30)  
Siddharth Tewari

## Tech Stack

**Language:** TypeScript

**Build Tools:** pnpm (monorepo), Vite, Rollup

**Runtime Technologies:** 
- Pyodide (Python execution in browser via WebAssembly)
- Babel Standalone (TypeScript compilation)
- TeaVM (Java to WebAssembly compilation)
- Web Workers (isolated execution contexts)
- iFrame sandboxing (secure JavaScript execution)

**Key Libraries:** @babel/standalone, pyodide, TypeScript Compiler API

## Features

- **Multi-Language Support**: Execute JavaScript, TypeScript, Python, and Java code in the browser
- **Sandboxed Execution**: Secure code execution using iframes and Web Workers
- **Interactive I/O**: Support for user input via `prompt()`, `input()`, and other interactive functions
- **File Management**: Import and export code files with proper language detection
- **Zero Server Dependency**: All code compilation and execution happens client-side
- **Modular Architecture**: Clean separation of language executors with unified core API
- **Real-time Output**: Capture and display stdout/stderr streams during execution

## Project Structure

```
WebRunnr/
├── packages/
│   ├── core/              # Core API facade and unified execution interface
│   │   └── src/
│   │       └── index.ts   # WebRunnrCore class with language routing
│   │
│   ├── js-executor/       # JavaScript execution via sandboxed iframes
│   │   └── src/
│   │       └── index.ts   # JavaScriptExecutor with I/O handling
│   │
│   ├── ts-executor/       # TypeScript compilation and execution
│   │   └── src/
│   │       ├── index.ts   # TypeScriptExecutor
│   │       └── compile.ts # Babel-based TypeScript compilation
│   │
│   ├── py-executor/       # Python execution via Pyodide (WebAssembly)
│   │   └── src/
│   │       └── index.ts   # PythonExecutor with async input support
│   │
│   ├── java-executor/     # Java execution via TeaVM WebAssembly
│   │   └── src/
│   │       └── index.ts   # JavaExecutor with WASM compilation
│   │
│   ├── cpp-executor/      # C++ executor (in development)
│   │   └── src/
│   │       └── index.ts   # CppExecutor (TODO)
│   │
│   └── playground/        # Demo UI with code editor and file management
│       └── src/
│           ├── index.ts   # FileManager and Playground implementation
│           └── types.ts   # Type definitions
│
├── package.json           # Root workspace configuration
├── pnpm-workspace.yaml    # Monorepo workspace definition
└── tsconfig.json          # Shared TypeScript configuration
```

## How It Works

### Code Execution Pipeline

1. **Language Detection**: Core identifies language from execution request
2. **Executor Selection**: Routes to appropriate language-specific executor
3. **Environment Setup**: Initializes sandboxed execution context (iframe/worker)
4. **Code Transformation**: Transforms async operations (e.g., `input()` → `async_input()`)
5. **Execution**: Runs code in isolated environment with I/O capture
6. **Output Collection**: Aggregates stdout/stderr streams
7. **Result Return**: Returns execution results to caller

### Language-Specific Implementation

**JavaScript**
- Executes in sandboxed iframe with restricted permissions
- Intercepts `prompt()` calls for interactive input
- Uses `postMessage` API for secure parent-child communication

**TypeScript**
- Compiles to JavaScript using Babel Standalone
- Executes compiled output via JavaScript executor
- Provides compilation error diagnostics

**Python**
- Runs via Pyodide (CPython compiled to WebAssembly)
- Transforms `input()` calls to async browser communication
- Supports package imports via Pyodide's package manager

**Java**
- Compiles to WebAssembly using TeaVM compiler
- Executes WASM binary in browser
- Captures System.out output for display

## Software Requirements

**Development:**
- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher
- TypeScript 5.0 or higher

**User (Browser):**
- Modern browser with WebAssembly support
- JavaScript enabled
- No additional installations required

## Quick Start

### Installation

```bash
# Fork the repository

# Clone the forked repository
git clone https://github.com/<your_username>/WebRunnr.git
cd WebRunnr

# Install dependencies
pnpm install
```

### Development

```bash
# Build all packages
pnpm build

# Run playground in development mode
pnpm --filter playground dev
```

## Notes

- First execution may take longer as WASM modules are downloaded and cached
- Python execution requires ~10-20MB Pyodide download on first use
- Java execution requires TeaVM runtime libraries
- All execution happens client-side with no server communication
- Input/output operations are non-blocking and use async patterns

## Contributing

See `CONTRIBUTING.md` for contribution guidelines.

## License

This repository is open-source under the MIT License.
See `LICENSE` for details.

## Maintainer

Maintained by: Bhuvan M S, Rehaan