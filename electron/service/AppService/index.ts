import { Service } from "../../utils";
import { TimeDispatcher } from "../Dispatcher/TimeDispatcher";
import { ElectronApp } from "./app";

@Service()
export class AppService {
  constructor(
    private app: ElectronApp,
    private timeDispatcher: TimeDispatcher
  ) {}
  async start() {
    await this.app.init();
    setInterval(() => {
      this.timeDispatcher.onTimeChange(this.app.win);
    }, 1000);
  }
  hide() {
    this.app.win.hide();
  }
  minimize() {
    this.app.win.minimize();
  }
  maximizeToggle() {
    if (!this.app.win.isMaximized()) {
      this.app.win.maximize();
    } else {
      this.app.win.unmaximize();
    }
  }
}
