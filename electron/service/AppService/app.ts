import { app, BrowserWindow, ipcMain, shell } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { Component } from "../../utils";
import {
  VITE_DEV_SERVER_URL,
  DIST,
  DIST_ELECTRON,
  VITE_PUBLIC,
} from "../../env";

@Component()
export class ElectronApp {
  win: BrowserWindow;
  preload = join(DIST_ELECTRON, "./service/AppService/preload.js");
  indexHtml = join(DIST, "index.html");
  constructor() {}
  async init() {
    // Disable GPU Acceleration for Windows 7
    if (release().startsWith("6.1")) app.disableHardwareAcceleration();
    // Set application name for Windows 10+ notifications
    if (process.platform === "win32") app.setAppUserModelId(app.getName());
    if (!app.requestSingleInstanceLock()) {
      app.quit();
      process.exit(0);
    }
    await app.whenReady();
    await this.createWindow();

    app.on("window-all-closed", () => {
      this.win = null;
      if (process.platform !== "darwin") app.quit();
    });

    app.on("second-instance", () => {
      if (this.win) {
        // Focus on the main window if the user tried to open another
        if (this.win.isMinimized()) this.win.restore();
        this.win.focus();
      }
    });

    app.on("activate", () => {
      const allWindows = BrowserWindow.getAllWindows();
      if (allWindows.length) {
        allWindows[0].focus();
      } else {
        this.createWindow();
      }
    });

    // New window example arg: new windows url
    ipcMain.handle("open-win", (_, arg) => {
      const childWindow = new BrowserWindow({
        webPreferences: {
          preload: this.preload,
          nodeIntegration: false,
          contextIsolation: true,
        },
      });

      if (VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
      } else {
        childWindow.loadFile(this.indexHtml, { hash: arg });
      }
    });
  }
  async createWindow() {
    this.win = new BrowserWindow({
      title: "Main window",
      icon: join(VITE_PUBLIC, "favicon.ico"),
      webPreferences: {
        preload: this.preload,
        // Disable nodeIntegration and enable contextIsolation is secure in production
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    if (VITE_DEV_SERVER_URL) {
      // electron-vite-vue#298
      this.win.loadURL(VITE_DEV_SERVER_URL);
      // Open devTool if the app is not packaged
      this.win.webContents.openDevTools();
    } else {
      this.win.loadFile(this.indexHtml);
    }

    // Test actively push message to the Electron-Renderer
    this.win.webContents.on("did-finish-load", () => {});

    // Make all links open with the browser, not with the application
    this.win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith("https:")) shell.openExternal(url);
      return { action: "deny" };
    });
    // win.webContents.on('will-navigate', (event, url) => { }) #344
  }
}
