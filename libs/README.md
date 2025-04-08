# Librarys for NestJS
This repository contains a collection of libraries designed to enhance the development experience with NestJS. The libraries are organized into different modules, each serving a specific purpose.

## Available Libraries
- `rmq`: A library for RabbitMQ integration with NestJS.

## Development Setup

To build and use the module during development, follow these steps:

1. Install the required dependencies:
   ```bash
   $ npm install
   ```

2. Build the module (example for the `rmq` module):
   ```bash
   $ nest build rmq
   ```

3. Import the necessary modules or functions into your project (example for the `rmq` module):
   ```typescript
   import { example } from '@app/rmq';
   ```

## Project Structure
Each library/module in this repository should follow a consistent structure to ensure maintainability and ease of use.

### Export Rules
- Each library should have an `index.ts` file that exports all the relevant classes, interfaces, and functions.
- If a module contains subfolders (e.g. interfaces/, decorators/, utils/), these folders must also have their own index.ts files that export everything from the files within them.
- The main `index.ts` file of the library should re-export everything from the subfolder index files.

### Example folder structure:
```
libs/
  rmq/
    src/
      interfaces/
        example.interface.ts
        index.ts         <-- exports all from example.interface.ts
      rmq.module.ts
      rmq.service.ts
      index.ts           <-- exports all from rmq.module.ts, rmq.service.ts, and interfaces/index.ts
```
