# Nx React Rspack Module Federation Serve Repro

Minimal Nx workspace that reproduces an issue when serving a React Rspack Module Federation host with static remotes.

The workspace contains:

- `apps/host`: host application
- `apps/remoteA`: static remote
- `apps/remoteB`: static remote

Both remotes enable Module Federation DTS generation.

## Reproduce

Install dependencies:

```sh
pnpm install --frozen-lockfile
```

Run the host serve target without the Nx cache:

```sh
pnpm nx serve host --skip-nx-cache
```

The command starts the module federation dev server and begins building the static remotes, but it stays at:

```text
NX Building 2 static remotes...
```

It does not continue to `NX Built 2 static remotes`. Press `Ctrl+C` to stop the process.

## Notes

- Nx version: `23.0.0-beta.19`
- Package manager: `pnpm`
- Bundler: Rspack
