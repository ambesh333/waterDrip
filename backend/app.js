import express from "express";
import cors from "cors";
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
import {
  getTotalVisitorsByDate,
  getTotalVisitorsByCountry,
  AdultVisitors,
  ChildrenVisitors,
  AdultVisitorsByDate,
  getChildVisitorsByDate,
} from "./database.js";

app.get("/totalVisitors", async (req, res) => {
  const startDate = {
    year: req.query.startYear,
    month: req.query.startMonth,
    day: req.query.startDay,
  };

  const endDate = {
    year: req.query.endYear,
    month: req.query.endMonth,
    day: req.query.endDay,
  };
  console.log(startDate);
  console.log(endDate);

  try {
    const totalVisitorsByDate = await getTotalVisitorsByDate(
      startDate,
      endDate
    );
    res.send(totalVisitorsByDate);
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});

app.get("/countryVisitors", async (req, res) => {
  const startDate = {
    year: req.query.startYear,
    month: req.query.startMonth,
    day: req.query.startDay,
  };

  const endDate = {
    year: req.query.endYear,
    month: req.query.endMonth,
    day: req.query.endDay,
  };
  console.log(startDate);
  console.log(endDate);

  try {
    const visitorCountByCountry = await getTotalVisitorsByCountry(
      startDate,
      endDate
    );
    res.send(visitorCountByCountry);
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});

app.get("/AdultVisitors", async (req, res) => {
  const startDate = {
    year: req.query.startYear,
    month: req.query.startMonth,
    day: req.query.startDay,
  };

  const endDate = {
    year: req.query.endYear,
    month: req.query.endMonth,
    day: req.query.endDay,
  };
  console.log(startDate);
  console.log(endDate);

  try {
    const totalAdultVisitors = await AdultVisitors(startDate, endDate);
    res.send(totalAdultVisitors);
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});

app.get("/ChildrenVisitors", async (req, res) => {
  const startDate = {
    year: req.query.startYear,
    month: req.query.startMonth,
    day: req.query.startDay,
  };

  const endDate = {
    year: req.query.endYear,
    month: req.query.endMonth,
    day: req.query.endDay,
  };
  console.log(startDate);
  console.log(endDate);

  try {
    const totalChildrenVisitors = await ChildrenVisitors(startDate, endDate);
    res.send(totalChildrenVisitors);
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});

app.get("/AdultVisitorsByDate", async (req, res) => {
  const startDate = {
    year: req.query.startYear,
    month: req.query.startMonth,
    day: req.query.startDay,
  };

  const endDate = {
    year: req.query.endYear,
    month: req.query.endMonth,
    day: req.query.endDay,
  };
  console.log(startDate);
  console.log(endDate);

  try {
    const adultCountByDate = await AdultVisitorsByDate(startDate, endDate);
    res.send(adultCountByDate);
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});

app.get("/getChildVisitorsByDate", async (req, res) => {
  const startDate = {
    year: req.query.startYear,
    month: req.query.startMonth,
    day: req.query.startDay,
  };

  const endDate = {
    year: req.query.endYear,
    month: req.query.endMonth,
    day: req.query.endDay,
  };
  console.log(startDate);
  console.log(endDate);

  try {
    const childCountByDate = await getChildVisitorsByDate(startDate, endDate);
    res.send(childCountByDate);
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
