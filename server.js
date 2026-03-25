const http = require("http");
const { version } = require("./package.json");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bienvenue</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: Arial, sans-serif;
            background: #f5f7fb;
            color: #1f2937;
          }
          main {
            text-align: center;
            padding: 2rem;
            border-radius: 12px;
            background: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }
          h1 {
            margin: 0 0 0.5rem;
          }
          p {
            margin: 0;
            color: #4b5563;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Bienvenue</h1>
          <p>Version ${version}</p>
        </main>
      </body>
    </html>
  `);
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = server;
