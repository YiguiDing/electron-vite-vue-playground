import "reflect-metadata";
import { factory } from "./utils";
import { AppService } from "./service/AppService";
import { ControllerClasses } from "./controller";
import { IpcRouterService } from "./service/IpcRouterService";

async function main(args: string[]) {
  const appService = factory(AppService);
  const ipcService = factory(IpcRouterService);
  await appService.start();
  ipcService.initIpcRouter(ControllerClasses);
  ipcService.start();
}

main(process.argv);
