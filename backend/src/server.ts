import * as dotenv from "dotenv";
import http from "http";
import { app } from "./app";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server running on http//localhost:${PORT}/`);
});
