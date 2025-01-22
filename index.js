const express = require("express");
const path = require("path");

const staticRoute = require("./routes/staticRouter");
const exploreRoute = require("./routes/exploreRouter");
const otherRoutes = require("./routes/othersRouter");

const cookieDecode = require("cookie-parser");
const {checkForAuthentication} = require("./middlewares/auth")

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve('./public')));
app.use(cookieDecode());
app.use(checkForAuthentication);

// Setting up the EJS engine
app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

// Routes...
app.use('/', staticRoute, otherRoutes)
app.use('/explore', exploreRoute)

app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
})