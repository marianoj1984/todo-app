require("dotenv").config();
const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");

app.use(express.json());
app.use("/tasks", tasksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
