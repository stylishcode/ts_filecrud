import {ServerResponse} from "http";
import { writeFile, readFile, unlink } from "fs";

let message: string | Buffer = "";

export const save = (filePath: string, 
                     data: string, 
                     response: ServerResponse ) => {
  writeFile(filePath, data, (error: any) => {
    if (error) {
      throw error;
    }
    message = "Usuário cadastrado/atualizado com sucesso!";
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.statusCode = 201;
    response.end(message);
  });
}

export const find = (filePath: string, response: ServerResponse) => {
  readFile(filePath, (error: any, data: Buffer) => {
    message = error ? "Usuário não encontrado" : data;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.statusCode = 200;
    response.end(message);
  });
}


export const remove = (filePath: string, response: ServerResponse) => {
  unlink(filePath, (error: any) => {
    message = error ? "Usuário não encontrado ou já removido" 
                    : "Usuário removido com sucesso";
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.statusCode = 200;
    response.end(message);
  });
}
