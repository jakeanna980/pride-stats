# Pride Basketball Stats

Stat tracker, shot charts, hard hat points and whiteboard for Henderson Collegiate Pride basketball.
It's a plain static website: no server, no database, no build step.

## What's in this folder

| File | What it does |
|---|---|
| `index.html` | The whole app |
| `sw.js` | Lets the app open with no Wi-Fi after the first visit |
| `manifest.webmanifest` + `icons/` | Home Screen icon and app name |
| `fonts/` | Fonts, stored locally so they work offline |
| `vercel.json` | Tells Vercel not to cache the app shell too aggressively |

## Deploy: GitHub → Vercel

1. **Create the repo.** On github.com: **New repository** → name it `pride-stats` → Private is fine → **Create repository**.
2. **Upload the files.** On the new repo page: **uploading an existing file** → drag in everything *inside* this folder (not the folder itself). `index.html` must be at the top level → **Commit changes**.
3. **Import into Vercel.** On vercel.com: sign up with GitHub → **Add New… → Project** → pick `pride-stats` → **Import**.
   - Framework Preset: **Other**. Leave Build Command and Output Directory empty → **Deploy**.
   - You'll get a URL like `pride-stats.vercel.app`.
4. **(Optional) Use your own domain.** In the Vercel project: **Settings → Domains** → add e.g. `stats.yourdomain.com`.
   Vercel shows the DNS record to add at your domain registrar (usually a `CNAME` pointing to `cname.vercel-dns.com`).
   HTTPS is automatic.

## Install on the iPad

1. Open your URL in **Safari** (it must be Safari for Add to Home Screen).
2. **Share → Add to Home Screen → Add.**
3. Always open it from the Home Screen icon. It runs full-screen, and your data stays with that icon.
4. Open it once while online. After that it opens even with no signal in the gym.

## Your data

- Everything saves automatically **on that iPad only**. Nothing is sent anywhere. It does not sync between devices.
- **Back up weekly:** Roster tab → **Download backup** → Save to Files / iCloud Drive (or AirDrop / email it to yourself).
  The Games tab reminds you when it's been more than 7 days.
- **Restore** (new iPad, cleared Safari, etc.): Roster tab → **Restore from file**.
- Deleting the Home Screen icon or clearing Safari website data **erases the stats**. Back up first.
- Demo data for testing: Roster tab → **Load demo data**, then **Remove demo data** when done. Your real players and games are never touched.

## Exporting a game to MaxPreps

Games tab → **MaxPreps** on the game row (or the MaxPreps button on the Game Report).
1. Type the quarter scores shown into MaxPreps' stat entry page for that game → **Save & Import Stats**.
2. **Choose File** → the downloaded `.txt` → **Import** → check → **Calculate Team Totals** → **Publish**.

MaxPreps matches players by **jersey number**, so keep numbers in the app identical to your MaxPreps roster.
Field names are editable on the Roster tab ("MaxPreps export"); they must match MaxPreps' basketball field list exactly.

## Updating the app later

Replace `index.html` in the GitHub repo (**Add file → Upload files**). Vercel redeploys automatically in about 30 seconds.
**Also open `sw.js` and bump `VERSION`** (e.g. `pride-v5` → `pride-v6`) so iPads pick up the new version.
The next time the iPad opens the app online, it loads the update. Your saved stats are not affected.
