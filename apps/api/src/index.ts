import createServer from "::server";

import { log } from "logger";

const port = process.env.PORT || 5001;

createServer().listen(port, () => {
  log(`api running on ${port}`);
});
