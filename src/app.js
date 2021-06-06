const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Neeraj Nasery",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Neeraj Nasery",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is help page",
    name: "Neeraj Nasery",
  });
});

app.get("/weather", (req, res) => {
  if (!req?.query?.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  const { address } = req.query;
  geoCode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    } else if (data) {
      const { longitude, latitude, location } = data;

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        } else if (data) {
          const { temperature, feelslike, cloudcover } = data;
          return res.send({ location, temperature, feelslike, cloudcover });
        }
      });
    }
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Neeraj Nasery",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Neeraj Nasery",
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
