import express from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.SERVER_PORT);

app.use(express.json({ limit: "10mb" }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
