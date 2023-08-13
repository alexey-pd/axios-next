"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify) {
  fastify.register(require("fastify-file-upload"), {
    limits: { fileSize: 50 * 1024 * 1024 },
  });
});
