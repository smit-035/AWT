const http = require("http");
const fs = require("fs");
const url = require("url"); // Built-in module to parse inputs

const server = http.createServer((req, res) => {
    // Parse the URL to see if there are inputs (query parameters)
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const userData = parsedUrl.query;

    // Log user input to the terminal so you know it's working
    if (Object.keys(userData).length > 0) {
        console.log(`Received Input at ${pathName}:`, userData);
    }

    let fileToRead = "";

    switch (pathName) {
        case "/":
        case "/login":
            fileToRead = "login.html";
            break;
        case "/purchase":
            fileToRead = "purchase.html";
            break;
        case "/profile":
            fileToRead = "profile.html";
            break;
        case "/logout":
            fileToRead = "logout.html";
            break;
        default:
            res.writeHead(404);
            res.end("Page not found");
            return;
    }

    fs.readFile(fileToRead, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Error loading page");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});