import { Controller, IpcInvokeHandle } from "../utils";
import { AppService } from "../service/AppService";

@Controller("/app")
export class AppController {
  constructor(private app: AppService) {}
  @IpcInvokeHandle("/hide")
  hide() {
    this.app.hide();
  }
  @IpcInvokeHandle("/minimize")
  minimize() {
    this.app.minimize();
  }
  @IpcInvokeHandle("/maximizeToggle")
  maximizeToggle() {
    this.app.maximizeToggle();
  }
}
