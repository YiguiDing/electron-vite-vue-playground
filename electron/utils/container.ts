import "reflect-metadata";
export * from "./decorater";

export type Constructor<T = any> = new (...args: any[]) => T;

const container: any = {};

export function factory<T>(Class: Constructor<T>): T {
  const name: string = Reflect.getMetadata("name", Class) || Class.name;
  if (name && container[name]) return container[name];
  const paramtypes = Reflect.getMetadata("design:paramtypes", Class);
  if (paramtypes==undefined) throw new Error(`${name} can not be constructed!!!`);
  const args = paramtypes.map(factory);
  return (container[name] = new Class(...args));
}
