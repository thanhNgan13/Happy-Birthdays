const express = require("express");
const path = require("path");
const app = express();
const favicon = require("serve-favicon");
const PORT = 8888;

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
// Sử dụng các tuyến đường từ thư mục routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Cung cấp các tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
