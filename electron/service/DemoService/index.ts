import { Service } from "../../utils";

@Service()
export class DemoService {
  constructor() {}
  echo(msg: string) {
    return msg;
  }
  add(a: number, b: number) {
    return a + b;
  }
  sub(a: number, b: number) {
    return a - b;
  }
  mut(a: number, b: number) {
    return a * b;
  }
  div(a: number, b: number) {
    return a / b;
  }
}
