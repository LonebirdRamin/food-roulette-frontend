# Food Roulette frontend

A Next.js app that helps you pick an everyday Thai meal and search for potentially relevant nearby restaurants.

## Run locally

Install Node.js 22.18 or later (Node.js 24 is recommended for deployment), then from this folder run:

```sh
npm install
npm run dev
```

Open http://localhost:3000. Press Ctrl+C in the terminal to stop the server. The Lobster display font loads from Google Fonts; a cursive fallback is used when it cannot be loaded.

## Test and build

```sh
npm test
npm run build
```

The automated tests use Node's built-in TypeScript support (Node.js 22.18 or newer). Random draws include the entire list, so the same dish can appear more than once in a row.

## Connect the backend

Copy `.env.example` to `.env.local` and set `BACKEND_API_URL` to the Spring Boot server's origin. For local development the example value is `http://localhost:8080`.

Start the backend separately, then start the frontend. To check the connection, visit http://localhost:3000/api/health or run:

```sh
curl -i http://localhost:3000/api/health
```

A successful response is `{"status":"ok"}`. This request goes from the browser or curl to the Next.js server, then from Next.js to Spring Boot. The route reports an error when configuration is missing or the backend is unavailable. It does not check restaurant search or Google Places.

## Find nearby places

Choose a dish, select **Find nearby restaurants**, then explicitly allow browser location access. If access is denied, enable location permission in your browser settings and try again. The search returns potentially relevant places within 5 km, ordered by straight-line distance; it does not confirm that a place serves the selected dish. The Google Maps button opens the place search in a new tab. Google Places and third-party attribution are shown with results. The backend needs a configured Google Places API key for live results.

The welcome and dish screens are fixed to the viewport. The location and results screens scroll within their panel when needed. Small landscape screens ask users to rotate their phone. Google Places content must not be cached beyond permitted exceptions; the search route uses `no-store`.


## Deployment on Vercel

1. Push the current frontend and backend commits to their GitHub repositories.
2. Deploy the backend on Render using the instructions in the backend README. Confirm its `/api/health` endpoint returns `{"status":"ok"}`.
3. In Vercel, import the frontend GitHub repository as a Next.js project. Select Node.js 24 in the project settings.
4. Add the server-side environment variable `BACKEND_API_URL` with the Render backend's HTTPS origin, for example `https://your-backend.onrender.com`. Do not use the Google API key here.
5. Deploy or redeploy after adding the environment variable. Open `/api/health` on the deployed frontend to check the connection.
6. In the deployed site, test randomization, location permission, restaurant search, results and Google Maps links on both desktop and mobile. Browser geolocation requires HTTPS (or localhost for development).

The backend's public search endpoint can incur Google Places charges. Review Google API key restrictions, quotas and billing alerts before deployment. Google Places also requires publicly accessible Terms of Use and a Privacy Policy; prepare and review those for your deployment.
