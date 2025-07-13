// www/ts/automaton.ts
var Automaton = class {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

// www/ts/env.ts
var Env = class {
  automata;
  _ctx;
  constructor(n, ctx) {
    this.automata = new Array();
    this._ctx = ctx;
    for (let i = 0; i < n; i++) {
      const x = Math.floor(
        Math.random() * this._ctx.canvas.width * 0.98 + this._ctx.canvas.width * 0.01
      );
      const y = Math.floor(
        Math.random() * this._ctx.canvas.height * 0.98 + this._ctx.canvas.height * 0.01
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
  draw_automaton(automaton) {
    this._ctx.beginPath();
    this._ctx.arc(
      automaton.x,
      automaton.y,
      this._ctx.canvas.width * 0.01,
      0,
      2 * Math.PI
    );
    this._ctx.fill();
    this._ctx.stroke();
  }
};

// www/ts/main.ts
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(
    "#exhibits-container"
  );
  const canvas = document.createElement("canvas");
  canvas.id = "exhibit-canvas";
  container.appendChild(canvas);
  const computedStyles = globalThis.getComputedStyle(canvas);
  const canvas_style_width = computedStyles.getPropertyValue("width");
  const canvas_style_height = computedStyles.getPropertyValue("height");
  const scale = globalThis.devicePixelRatio;
  canvas.width = scale * parseInt(canvas_style_width);
  canvas.height = scale * parseInt(canvas_style_height);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#222";
  ctx.globalAlpha = 0.8;
  const env = new Env(50, ctx);
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    env.step();
    env.draw();
    globalThis.requestAnimationFrame(draw);
  }
  globalThis.requestAnimationFrame(draw);
});
