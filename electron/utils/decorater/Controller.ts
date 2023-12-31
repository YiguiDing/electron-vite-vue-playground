export function Controller(
  prefix: string,
  name?: string
): ClassDecorator {
  return (targetClass: object) => {
    name && Reflect.defineMetadata("name", name, targetClass);
    Reflect.defineMetadata('prefix', prefix, targetClass);
  };
}
