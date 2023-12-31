export function Component(name?: string): ClassDecorator {
    return (targetClass: object) => {
        name && Reflect.defineMetadata("name", name, targetClass)
    }
}