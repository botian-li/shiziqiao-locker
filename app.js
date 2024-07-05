const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

// 5.1 - 5.2
app.get("/unLockDoor-3382175", async (req, res) => {
    try {
        const response = await axios.get("http://150.158.131.151:8282/app/openDoor?door_id=20230907104041691909", {
            headers: {
                'Authorization': '52553373-ced1-46a9-b51c-460a3b07a2db'
            }
        });
        // Extract the message from the API response and embed it in HTML
        const apiMessage = response.data.message;  // '门已开'
        const customHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>API Response</title>
</head>
<body>
    <section>
      ${apiMessage}  <!-- Display the API message here -->
    </section>
  </body>
</html>
        `;
        res.type('html').send(customHtml);
    } catch (error) {
        console.error("Error calling the openDoor API:", error.message);
        res.status(500).send("开门失败，请联系管家~");
    }
});


const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      /* Styling omitted for brevity */
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`;
