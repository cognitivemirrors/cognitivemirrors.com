// www/ts/main.ts
function drawCircle(x, y, radius, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#222";
  ctx.fill();
  ctx.stroke();
}
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(
    "#exhibits-container"
  );
  const canvas = document.createElement("canvas");
  canvas.id = "exhibit-canvas";
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const computedStyles = globalThis.getComputedStyle(canvas);
  const canvas_style_width = computedStyles.getPropertyValue("width");
  const canvas_style_height = computedStyles.getPropertyValue("height");
  const scale = globalThis.devicePixelRatio;
  canvas.width = scale * parseInt(canvas_style_width);
  canvas.height = scale * parseInt(canvas_style_height);
  ctx.fillStyle = "grey";
  ctx.fillRect(
    canvas.width * 0.02,
    canvas.height * 0.02,
    canvas.width * 0.96,
    canvas.height * 0.96
  );
  drawCircle(canvas.width * 0.5, canvas.width * 0.5, canvas.width * 0.01, ctx);
});
