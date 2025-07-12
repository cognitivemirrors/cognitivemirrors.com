document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(
    "#exhibits-container",
  ) as HTMLDivElement;

  const canvas = document.createElement("canvas");
  canvas.id = "exhibit-canvas";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.fillStyle = "grey";

  const canvas_width = canvas.width;
  const canvas_height = canvas.height;
  ctx.fillRect(
    canvas_width * 0.02,
    canvas_height * 0.02,
    canvas_width * 0.96,
    canvas_height * 0.96,
  );
});
