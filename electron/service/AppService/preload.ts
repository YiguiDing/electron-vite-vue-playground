import { contextBridge, ipcRenderer } from "electron";
import { useLoading } from "./hooks";

export interface WindowWithMyApi {
  myApi: {
    ipcInvoke(channel: string, ...args: any[]): Promise<any>;
    ipcHandler(channel: string, callback: Function): void;
  };
}

let api: WindowWithMyApi["myApi"] = {
  ipcInvoke: async (channel: string, ...args) => {
    return await ipcRenderer.invoke("IpcRouter", channel, ...args);
  },
  ipcHandler: (channel: string, handler: Function) => {
    return ipcRenderer.on(channel, (event, ...args) => handler(...args));
  },
};

contextBridge.exposeInMainWorld("myApi", api);

useLoading();
