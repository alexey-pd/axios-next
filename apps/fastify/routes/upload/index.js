"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (req, reply) {
    reply.notFound();
  });
  fastify.post("/", async function (request, reply) {
    const files = req.raw.files;
    console.log(files);
    let fileArr = [];
    for (let key in files) {
      fileArr.push({
        name: files[key].name,
        mimetype: files[key].mimetype,
      });
    }
    reply.send(fileArr);
  });

  fastify.post("/uploadSchema", {
    schema: {
      body: {
        type: "object",
        properties: {
          file: { type: "object" },
        },
        required: ["file"],
      },
    },
    handler: (request, reply) => {
      const file = request.body.file;

      // for fix error run yarn add @types/node or npm install @types/node
      console.log(file);
      reply.send({ file });
    },
  });
};
