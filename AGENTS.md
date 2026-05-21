## Project stack

React + TypeScript + Vite + Tailwind CSS + shadcn/ui + TanStack Query + zustand.

## Architecture

Use Feature-Sliced Design:

- app/
- pages/
- widgets/
- features/
- entities/
- shared/

## Code style

- Prefer small typed components.
- Do not add new UI libraries unless necessary.
- Use shadcn/ui primitives where possible.
- Use TanStack Query for server state.
- Keep business logic out of components.
- After code changes run: npm run lint and npm run build.

## Before implementing

First explain the plan briefly, then edit files.
