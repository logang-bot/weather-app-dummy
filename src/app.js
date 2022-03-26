const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORt || 3000;

// Defining path for views config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Logang",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Logang",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Logang",
    helpText: "This is some helpful message",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address ",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send(error);
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a searh term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    errMessage: "Help article not found",
    title: "404",
    name: "Logang",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    errMessage: "Page not found",
    title: "404",
    name: "Logang",
  });
});

app.listen(port, () => {
  console.log("server running on port " + port);
});
