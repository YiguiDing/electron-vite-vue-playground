import { join } from "node:path";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├── main.js              > Electron-Main
// │ └─┬ service/AppService
// │   └── preload.js         > Preload-Scripts
// ├─┬ dist
// │ └── index.html           > Electron-Renderer
//

export const DIST_ELECTRON = join(__dirname, ".");
export const DIST = join(DIST_ELECTRON, "../dist");
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
export const VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? join(DIST_ELECTRON, "../public")
  : DIST;
