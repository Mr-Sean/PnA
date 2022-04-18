require('dotenv').config();
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows frontend @ port 3000 to make calls to backend @ port 8000.
// Taking it away will result in "cors errors" when attempting your axios calls!
app.use(cors({
    credentials: true,
    origin:"http://localhost:3000"
}));

// Configuring the server to accept and update cookies
// and helps decode the contents of said cookies
app.use(cookieParser());

require("./config/mongoose.config");

// require("./routes/rate.routes")(app);
require("./routes/user.routes")(app);
require("./routes/hero.routes")(app);
// Longhand:
// const heroRoutes = require("./routes/hero.routes");
// heroRoutes(app);

app.listen(process.env.MY_PORT, () => 
    console.log(`Listening on Port ${process.env.MY_PORT}`))