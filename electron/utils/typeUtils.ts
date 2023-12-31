export type DTO<T extends (...args: any) => any> = Parameters<T>;
export type VO<T extends (...args: any) => any> = Awaited<ReturnType<T>>;
