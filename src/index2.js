import "@babel/polyfill";
import http from "http";
import { app } from ".";

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

export const server = http.createServer(app);

server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});
server.listen(app.get("port"));
