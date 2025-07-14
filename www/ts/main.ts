import Env from "./env.ts";
import ProSocialWalk from "./prosocialwalk.ts";
import RandomWalk from "./randomwalk.ts";
import Strategy from "./strategy.ts";

function draw_strategy_to_canvas(
  strategy: Strategy,
  canvas: HTMLCanvasElement,
) {
  const canvasRect = canvas.getBoundingClientRect();

  const canvas_style_width = canvasRect.width;
  const canvas_style_height = canvasRect.height;

  const scale = globalThis.devicePixelRatio;

  canvas.width = scale * canvas_style_width;
  canvas.height = scale * canvas_style_height;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
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
    "#random-walk-canvas",
  ) as HTMLCanvasElement;
  draw_strategy_to_canvas(new RandomWalk(), random_walk_canvas);

  const pro_social_canvas = document.querySelector(
    "#pro-social-canvas",
  ) as HTMLCanvasElement;
  draw_strategy_to_canvas(new ProSocialWalk(), pro_social_canvas);
});
