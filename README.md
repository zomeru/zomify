# Zomify

A spotify clone built with SvelteKit and Tailwind CSS.

## Setting up environment

Create a `.env` file in root directory.

Create a spotify developer app and get your credentials [here](https://developer.spotify.com/dashboard/applications).

```bash

SPOTIFY_APP_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_APP_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET

SPOTIFY_BASE_URL=https://api.spotify.com/v1
BASE_URL=http://localhost:3000
```

## Developing

```bash
pnpm install

# then

pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
