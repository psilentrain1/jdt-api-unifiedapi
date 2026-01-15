import express from "express";

const app = express();
const PORT = Number(process.env.SERVER_PORT);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "ping" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
