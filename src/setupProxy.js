const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    console.log("WHATS PROXY SETUP", proxy);
    app.use([
        proxy("/api/notification/", { target: "http://localhost:5001" }),
        proxy("/api/auth/", { target: "http://localhost:5000" })
    ]);
};
