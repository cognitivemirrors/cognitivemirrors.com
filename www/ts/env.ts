import Automaton from "./automaton.ts";
import Strategy from "./strategy.ts";

export default class Env {
  automata: Automaton[];
  strategy: Strategy;
  private _ctx: CanvasRenderingContext2D;

  constructor(n: number, ctx: CanvasRenderingContext2D, strategy: Strategy) {
    this.automata = new Array<Automaton>();
    this.strategy = strategy;
    this._ctx = ctx;

    const radius = Math.sqrt(this.width * this.height) *
      0.02;

    console.log(`Initializing env of size:${this.width}, ${this.height}`);
    for (let i = 0; i < n; i++) {
      const x = Math.floor(Math.random() * (this.width - 2 * radius) + radius);
      const y = Math.floor(Math.random() * (this.height - 2 * radius) + radius);
      this.automata.push(new Automaton(x, y, radius));
    }
  }
  get height() {
    return this._ctx.canvas.height;
  }

  get width() {
    return this._ctx.canvas.width;
  }
  step() {
    this.strategy.step(this);
  }
  draw() {
    for (const automaton of this.automata) {
      this.draw_automaton(automaton);
    }
  }
  draw_automaton(automaton: Automaton) {
    this._ctx.beginPath();
    this._ctx.arc(
      automaton.x,
      automaton.y,
      automaton.radius,
      0,
      2 * Math.PI,
    );
    this._ctx.fill();
    this._ctx.stroke();
  }
}
