import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { build, output } from './build.mjs';

await build();
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml' };
const port = Number(process.env.PORT || 3000);
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let path = resolve(output, `.${pathname}`);
    if (path !== output && !path.startsWith(output + sep)) { res.writeHead(403).end(); return; }
    if ((await stat(path)).isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(302, {Location: pathname + '/'}).end(); return; }
      path = resolve(path, 'index.html');
    }
    const body = await readFile(path);
    res.writeHead(200, {'Content-Type': types[extname(path)] || 'application/octet-stream'}).end(body);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'}).end(await readFile(resolve(output, '404.html')));
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://localhost:${port}`));
