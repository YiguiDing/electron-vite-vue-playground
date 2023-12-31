export function IpcInvokeHandle(ipc_channel_name: string): MethodDecorator {
    return (targetClass: any, propertyName: string | symbol) => {
        Reflect.defineMetadata('ipc-invoke-handle-channel-name', ipc_channel_name, targetClass, propertyName)
    }
}
export function IpcEmitOn(ipc_event_name: string): MethodDecorator {
    return (targetClass: any, propertyName: string | symbol) => {
        Reflect.defineMetadata('ipc-emit-on-event-name', ipc_event_name, targetClass, propertyName)
    }
}