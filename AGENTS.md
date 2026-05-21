## Project stack

React + TypeScript + Vite + Tailwind CSS + shadcn/ui + TanStack Query + zustand.

## shadcn/ui and MCP rules

This project uses shadcn/ui.

Use shadcn MCP for installing and inspecting shadcn/ui components.

Do not manually create shadcn primitive components in `components/ui`.

Primitive components include:

- button
- badge
- card
- input
- table
- dialog
- select
- dropdown-menu
- tabs
- tooltip
- skeleton
- sheet
- form
- alert

When a primitive UI component is needed:

1. Use shadcn MCP or shadcn CLI.
2. Import it from `@/components/ui/...`.
3. Do not recreate its implementation manually.

Allowed:

- create business wrappers around shadcn primitives.

Examples:

- `RiskBadge` may wrap `Badge`
- `ApiCard` may wrap `Card`
- `IntegrationStatusBadge` may wrap `Badge`
- `RequestsTable` may wrap `Table`

Not allowed:

- manually writing `components/ui/badge.tsx`
- manually recreating `Button`, `Card`, `Input`, `Table`
- creating custom primitive UI if shadcn already has one

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
