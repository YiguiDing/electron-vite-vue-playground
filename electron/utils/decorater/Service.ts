export function Service(name?: string): ClassDecorator {
    return (targetClass: Object) => {
        name && Reflect.defineMetadata("name", name, targetClass)
    }
}