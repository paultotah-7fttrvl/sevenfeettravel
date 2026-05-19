# Contact form setup (Web3Forms)

The inquiry form posts from the browser to **Web3Forms**. The access key is **not committed** to git: it is injected during deploy from a secret environment variable.

## Production (Render)

1. In [Render](https://dashboard.render.com) open your **static site** → **Environment**.
2. Add **`WEB3FORMS_ACCESS_KEY`** with your Web3Forms access key. Mark it **Secret**.
3. Set **Build Command** to:  
   `npm run build`  
   (runs `node scripts/inject-web3forms-key.js`; no npm packages required.)
4. Keep **Publish Directory** as `.` (repository root), unless you already use a different layout.
5. In the [Web3Forms dashboard](https://web3forms.com), restrict **allowed domains** to `www.sevenfeettravel.com`.

Each deploy runs the build step, which replaces the placeholder `__WEB3FORMS_ACCESS_KEY__` inside `index.html` with the secret value. The repo copy of `index.html` always keeps the placeholder.

## Local preview with a working form

1. Copy `.env.example` to `.env` and set `WEB3FORMS_ACCESS_KEY=...` (`.env` is gitignored).
2. Run `npm run build`, then serve the folder (for example `python3 -m http.server`).

Without `.env` or env vars, the contact section shows the configuration notice and submissions stay disabled.

## Security notes

- Anyone can still see the key in **View Source** or **Network** on the **live** site after injection—that is normal for browser-based form APIs. Keeping it out of **GitHub** stops bots from scraping the repo and avoids leaking keys in PRs and clones.
- Because a key was previously committed to git history, **rotate it** in Web3Forms and store only the new value in Render’s environment.

## Fallback

If the form fails, the contact section still lists **Instagram** and **email**.
