import Env from "./env.ts";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(
    "#exhibits-container",
  ) as HTMLDivElement;

  const canvas = document.createElement("canvas");
  canvas.id = "exhibit-canvas";
  container.appendChild(canvas);

  const computedStyles = globalThis.getComputedStyle(canvas);
  const canvas_style_width = computedStyles.getPropertyValue("width");
  const canvas_style_height = computedStyles.getPropertyValue("height");

  const scale = globalThis.devicePixelRatio;

  canvas.width = scale * parseInt(canvas_style_width);
  canvas.height = scale * parseInt(canvas_style_height);

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
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
