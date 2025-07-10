import { serveDir } from "@std/http/file-server";

const PORT = 8000;

async function handler(req: Request): Promise<Response> {
  return await serveDir(req, {
    fsRoot: "www",
    urlRoot: "",
  });
}

console.log(`Server running at http://localhost:${PORT}/`);
Deno.serve({ port: PORT }, handler);
