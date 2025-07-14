import Env from "./env.ts";

export default abstract class Strategy {
  abstract step(env: Env): void;
}
