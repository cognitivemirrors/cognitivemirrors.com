// www/ts/automaton.ts
var Automaton = class {
  x;
  y;
  radius;
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
};

// www/ts/env.ts
var Env = class {
  automata;
  strategy;
  _ctx;
  constructor(n, ctx, strategy) {
    this.automata = new Array();
    this.strategy = strategy;
    this._ctx = ctx;
    const radius = Math.sqrt(this.width * this.height) * 0.02;
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
  draw_automaton(automaton) {
    this._ctx.beginPath();
    this._ctx.arc(
      automaton.x,
      automaton.y,
      automaton.radius,
      0,
      2 * Math.PI
    );
    this._ctx.fill();
    this._ctx.stroke();
  }
};

// www/ts/strategy.ts
var Strategy = class {
};

// www/ts/prosocialwalk.ts
var ProSocialWalk = class extends Strategy {
  force(a, b) {
    const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    const diam = a.radius + b.radius;
    const x = dist / diam;
    const h = 20;
    if (x > 1) {
      return 1 / (h * x - h + 1) - 1 / (h * x - h + 1) ** 2;
    }
    return 50 * (-1 / x ** 2 + 1);
  }
  step(env) {
    for (const automata of env.automata) {
      let force_x = 0;
      let force_y = 0;
      const force_scalar = 10 / Math.sqrt(env.width * env.height);
      for (const neighbour of env.automata) {
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
};

// www/ts/randomwalk.ts
var RandomWalk = class extends Strategy {
  step(env) {
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
};

// www/ts/main.ts
function draw_strategy_to_canvas(strategy, canvas) {
  const canvasRect = canvas.getBoundingClientRect();
  const canvas_style_width = canvasRect.width;
  const canvas_style_height = canvasRect.height;
  const scale = globalThis.devicePixelRatio;
  canvas.width = scale * canvas_style_width;
  canvas.height = scale * canvas_style_height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#222";
  ctx.globalAlpha = 0.8;
  const env = new Env(50, ctx, strategy);
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    env.step();
    env.draw();
    globalThis.requestAnimationFrame(draw);
  }
  globalThis.requestAnimationFrame(draw);
}
document.addEventListener("DOMContentLoaded", () => {
  const random_walk_canvas = document.querySelector(
    "#random-walk-canvas"
  );
  draw_strategy_to_canvas(new RandomWalk(), random_walk_canvas);
  const pro_social_canvas = document.querySelector(
    "#pro-social-canvas"
  );
  draw_strategy_to_canvas(new ProSocialWalk(), pro_social_canvas);
});
