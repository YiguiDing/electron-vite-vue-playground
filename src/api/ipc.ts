import type { WindowWithMyApi } from "../../electron/service/AppService/preload";
declare const window: typeof globalThis & WindowWithMyApi;

export async function ipcInvoke(channel: string, ...args: any[]) {
  let { data, error } = await window.myApi.ipcInvoke(channel, ...args);
  if (error) throw new Error(error);
  else return data;
}
export async function ipcHandler(channel: string, callback: Function) {
  window.myApi.ipcHandler(channel, callback);
}
