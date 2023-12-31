import { DemoService } from "../service/DemoService";
import { Controller, IpcInvokeHandle } from "../utils";
import { DTO, VO } from "../utils/typeUtils";

@Controller("/demo")
export class DemoController {
  constructor(private demoService: DemoService) {}
  @IpcInvokeHandle("/echo")
  async echo(msg: string): Promise<string> {
    return await this.demoService.echo(msg);
  }
  @IpcInvokeHandle("/add")
  async add(a: number, b: number): Promise<number> {
    return await this.demoService.add(a, b);
  }
  @IpcInvokeHandle("/sub")
  async sub(a: number, b: number): Promise<number> {
    return await this.demoService.sub(a, b);
  }
  @IpcInvokeHandle("/mut")
  async mut(a: number, b: number): Promise<number> {
    return await this.demoService.mut(a, b);
  }
  @IpcInvokeHandle("/div")
  async div(a: number, b: number): Promise<number> {
    return await this.demoService.div(a, b);
  }
}

export type DemoEcho_DTO = DTO<typeof DemoController.prototype.echo>;
export type DemoEcho_VO = VO<typeof DemoController.prototype.echo>;

export type DemoAdd_DTO = DTO<typeof DemoController.prototype.add>;
export type DemoAdd_VO = VO<typeof DemoController.prototype.add>;

export type DemoSub_DTO = DTO<typeof DemoController.prototype.sub>;
export type DemoSub_VO = VO<typeof DemoController.prototype.sub>;

export type DemoMut_DTO = DTO<typeof DemoController.prototype.mut>;
export type DemoMut_VO = VO<typeof DemoController.prototype.mut>;

export type DemoDiv_DTO = DTO<typeof DemoController.prototype.div>;
export type DemoDiv_VO = VO<typeof DemoController.prototype.div>;
