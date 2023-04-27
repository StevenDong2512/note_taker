const express = require("express");
const route = require("./route");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(route);

app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
});