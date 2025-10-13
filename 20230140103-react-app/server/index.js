const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());


        
app.get("/", (req, res) => {
res.json({ message: "Hello ini teh Server!" });
});



app.get("/hello", (req, res) => {
const name = String(req.query.name || "").trim();
res.json({ message: name ? `Hello, ${name}!` : "Hello!" });
});


app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});