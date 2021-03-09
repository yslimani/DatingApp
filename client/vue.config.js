const fs = require("fs");
var path = require('path');


module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    https: {
      key: fs.readFileSync(path.resolve("./ssl/server.key")),
      cert: fs.readFileSync(path.resolve("./ssl/server.crt"))
    }
  }
};