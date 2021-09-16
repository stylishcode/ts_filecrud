import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import * as qs from "query-string";

import * as userRepository from "./repositories/userRepository";

const hostname: string = "localhost";
const port: number = 3000;

const server = createServer((request: IncomingMessage , 
                             response: ServerResponse ) => {
  const urlParse = parse(request.url ? request.url : "", true);  
  const params = qs.parse(urlParse.search ? urlParse.search : "");
  const path = `database/users/${params.id}.txt`;

  if (urlParse.pathname === "/create-update-user") {
    userRepository.save(path, JSON.stringify(params), response);
    return;
  }

  if (urlParse.pathname === "/find-user") {
    userRepository.find(path, response);
    return;
  }

  if (urlParse.pathname === "/delete-user") { 
    userRepository.remove(path, response);
    return; 
  }

});

server.listen(port, hostname, () => {
  console.log(`Server listening at ${hostname}:${port}`);
});

