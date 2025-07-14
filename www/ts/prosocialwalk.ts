import Automaton from "./automaton.ts";
import Env from "./env.ts";
import Strategy from "./strategy.ts";

/** Calculates force that cell A exerts on cell B */
export default class ProSocialWalk extends Strategy {
  force(a: Automaton, b: Automaton) {
    const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    const diam = a.radius + b.radius;
    const x = dist / diam;
    const h = 20;

    if (x > 1) {
      return 1 / (h * x - h + 1) - 1 / (h * x - h + 1) ** 2;
    }
    return 50 * (-1 / x ** 2 + 1);
  }
  step(env: Env) {
    for (const automata of env.automata) {
      let force_x = 0;
      let force_y = 0;
      const force_scalar = 10 / Math.sqrt(env.width * env.height);

      //calculate force being applied by neighbours
      //TODO: Stop calculating every force between neighbours twice
      for (const neighbour of env.automata) {
        // skip if self
        if (automata == neighbour) {
          continue;
        }
        const force = this.force(neighbour, automata);
        force_x += force_scalar * force * (neighbour.x - automata.x);
        force_y += force_scalar * force * (neighbour.y - automata.y);
      }
      automata.x = Math.max(0, Math.min(automata.x + force_x, env.width));
      automata.y = Math.max(0, Math.min(automata.y + force_y, env.height));
    }
  }
}
