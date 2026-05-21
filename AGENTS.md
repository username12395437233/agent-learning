## Project stack

React + TypeScript + Vite + Tailwind CSS + shadcn/ui + TanStack Query + zustand.

## shadcn/ui and MCP rules

This project uses shadcn/ui.

Use shadcn MCP for installing and inspecting shadcn/ui components.

Do not manually create shadcn primitive components in `components/ui`.

## Architecture

Use Feature-Sliced Design:

- app/
- pages/
- widgets/
- features/
- entities/
- shared/

## Validate after changes

- npm run format
- npm run lint
- npm run build
