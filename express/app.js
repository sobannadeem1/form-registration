const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = process.env.PORT || 2000;
const path = require("path");
dotenv.config();

const direc = path.join(__dirname, "../public");
app.use(express.static(direc));
app.set("view engine", "ejs");
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(
  `mongodb+srv://soban312004:8TbhJtz5iUpD5RsF@cluster0.nzgspwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const registration = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Registration = mongoose.model("registrationschema", registration);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.get("/", (req, res) => {
  res.render("home");
});
app.post("/register", async (req, res) => {
  try {
    const check = await Registration.findOne({ email: email });
    if (!check) {
      const { name, email, password } = req.body;
      const registrationdata = new Registration({
        name,
        email,
        password,
      });
      await registrationdata.save();
      res.redirect("/success");
    } else {
      alert("user already exist");
    }
  } catch {
    res.redirect("/error");
  }
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/success", (req, res) => {
  res.render("success");
});
app.get("/error", (req, res) => {
  res.render("error");
});
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
