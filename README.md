# microfrontend-architecture-react

## How to Run the Project

To start both the remote and host applications together, use the script defined in the root `package.json`:

```bash
pnpm run dev
```

This command will:
- Build the remote app first (`pnpm run dev:remote`)
- Then start the host app in development mode (`pnpm run dev:host`)

Make sure you have installed all dependencies with:

```bash
pnpm install