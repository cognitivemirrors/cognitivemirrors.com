import Automaton from "./automaton.ts";

export default class Env {
  automata: Automaton[];
  _ctx: CanvasRenderingContext2D;
  constructor(n: number, ctx: CanvasRenderingContext2D) {
    this.automata = new Array<Automaton>();
    this._ctx = ctx;
    for (let i = 0; i < n; i++) {
      const x = Math.floor(
        Math.random() * this._ctx.canvas.width * 0.98 +
          this._ctx.canvas.width * 0.01,
      );
      const y = Math.floor(
        Math.random() * this._ctx.canvas.height * 0.98 +
          this._ctx.canvas.height * 0.01,
      );
      this.automata.push(new Automaton(x, y));
    }
  }
  step() {
    for (const automata of this.automata) {
      const choice = Math.random();
      if (choice < 0.25) {
        automata.x = Math.min(automata.x + 1, this._ctx.canvas.width);
      } else if (choice < 0.5) {
        automata.x = Math.max(automata.x - 1, 0);
      } else if (choice < 0.75) {
        automata.y = Math.min(automata.y + 1, this._ctx.canvas.height);
      } else {
        automata.y = Math.max(automata.y - 1, 0);
      }
    }
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
      this._ctx.canvas.width * 0.01,
      0,
      2 * Math.PI,
    );
    this._ctx.fill();
    this._ctx.stroke();
  }
}
