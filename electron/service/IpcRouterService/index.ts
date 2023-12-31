import { ipcMain } from "electron";
import { Constructor, Service, factory } from "../../utils";

@Service()
export class IpcRouterService {
  router = new Map<string, Function>();
  constructor() {}
  start() {
    ipcMain.handle("IpcRouter", async (event, channel, ...args) => {
      if (!this.router.has(channel)) {
        throw new Error(`unknow router channel: ${channel}`);
      }
      return await this.router.get(channel)(...args);
    });
  }
  initIpcRouter(ControllerClasses: Constructor[]) {
    for (const ControllerClass of ControllerClasses) {
      const controller = factory(ControllerClass);
      const proto = ControllerClass.prototype;
      const prefix = Reflect.getMetadata("prefix", ControllerClass);
      if (!prefix) return;
      const funcs = Object.getOwnPropertyNames(proto).filter(
        (item) =>
          typeof controller[item] === "function" && item !== "constructor"
      );
      funcs.forEach((funcName) => {
        const channelName = Reflect.getMetadata(
          "ipc-invoke-handle-channel-name",
          proto,
          funcName
        );
        if (!channelName) return;
        const channel = prefix + channelName;
        this.router.set(channel, async (...args) => {
          try {
            const result = await controller[funcName].call(controller, ...args);
            return { data: result };
          } catch (error) {
            return { error: error };
          }
        });
      });
    }
  }
}
