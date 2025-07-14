import Env from "./env.ts";
import Strategy from "./strategy.ts";

export default class RandomWalk extends Strategy {
  step(env: Env) {
    for (const automata of env.automata) {
      const choice = Math.random();
      if (choice < 0.25) {
        automata.x = Math.min(automata.x + 1, env.width);
      } else if (choice < 0.5) {
        automata.x = Math.max(automata.x - 1, 0);
      } else if (choice < 0.75) {
        automata.y = Math.min(automata.y + 1, env.height);
      } else {
        automata.y = Math.max(automata.y - 1, 0);
      }
    }
  }
}
