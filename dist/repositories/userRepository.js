"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.find = exports.save = void 0;
var fs_1 = require("fs");
var message = "";
var save = function (filePath, data, response) {
    (0, fs_1.writeFile)(filePath, data, function (error) {
        if (error) {
            throw error;
        }
        message = "Usuário cadastrado/atualizado com sucesso!";
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.statusCode = 201;
        response.end(message);
    });
};
exports.save = save;
var find = function (filePath, response) {
    (0, fs_1.readFile)(filePath, function (error, data) {
        message = error ? "Usuário não encontrado" : data;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.statusCode = 200;
        response.end(message);
    });
};
exports.find = find;
var remove = function (filePath, response) {
    (0, fs_1.unlink)(filePath, function (error) {
        message = error ? "Usuário não encontrado ou já removido"
            : "Usuário removido com sucesso";
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.statusCode = 200;
        response.end(message);
    });
};
exports.remove = remove;
