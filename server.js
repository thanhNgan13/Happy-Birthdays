const express = require("express");
const path = require("path");
const app = express();
const PORT = 8888;

// Sử dụng các tuyến đường từ thư mục routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Cung cấp các tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
