import { BrowserWindow } from "electron";
import { Component } from "../../utils";

@Component()
export class TimeDispatcher {
  constructor() {}
  async onTimeChange(win: BrowserWindow) {
    win.webContents.send("/time/current_time", new Date().toLocaleString());
  }
}
