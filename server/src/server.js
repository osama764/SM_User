const express = require("express");
const cors = require("cors");
const devicesRouter = require("./routers/devices.router");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()).use(express.json());

app.use("/api/devices", devicesRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
