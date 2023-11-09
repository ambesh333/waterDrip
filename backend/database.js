import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();
const db = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// async function getHotels() {
//   const [rows] = await db.query("SELECT * FROM hotel");
//   return rows;
// }

export async function getTotalVisitorsByDate(startDate, endDate) {
  try {
    const [rows] = await db.query(
      "SELECT arrival_date_year, arrival_date_month, arrival_date_day_of_month, SUM(adults + children + babies) as totalVisitors FROM hotel WHERE (arrival_date_year > ? OR (arrival_date_year = ? AND arrival_date_month > ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month >= ?)) AND (arrival_date_year < ? OR (arrival_date_year = ? AND arrival_date_month < ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month <= ?)) GROUP BY arrival_date_year, arrival_date_month, arrival_date_day_of_month",
      [
        startDate.year,
        startDate.year,
        startDate.month,
        startDate.year,
        startDate.month,
        startDate.day,
        endDate.year,
        endDate.year,
        endDate.month,
        endDate.year,
        endDate.month,
        endDate.day,
      ]
    );

    const totalVisitorsByDate = {};
    rows.forEach((row) => {
      const dateKey = `${row.arrival_date_year}-${row.arrival_date_month}-${row.arrival_date_day_of_month}`;
      totalVisitorsByDate[dateKey] = row.totalVisitors;
    });

    return totalVisitorsByDate;
  } catch (error) {
    throw error;
  }
}

export async function getTotalVisitorsByCountry(startDate, endDate) {
  try {
    const [rows] = await db.query(
      "SELECT h.country, SUM(h.adults + h.children + h.babies) as totalVisitors FROM hotel h JOIN (SELECT DISTINCT arrival_date_year, arrival_date_month, arrival_date_day_of_month FROM hotel WHERE (arrival_date_year > ? OR (arrival_date_year = ? AND arrival_date_month > ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month >= ?)) AND (arrival_date_year < ? OR (arrival_date_year = ? AND arrival_date_month < ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month <= ?))) d ON h.arrival_date_year = d.arrival_date_year AND h.arrival_date_month = d.arrival_date_month AND h.arrival_date_day_of_month = d.arrival_date_day_of_month GROUP BY h.country",
      [
        startDate.year,
        startDate.year,
        startDate.month,
        startDate.year,
        startDate.month,
        startDate.day,
        endDate.year,
        endDate.year,
        endDate.month,
        endDate.year,
        endDate.month,
        endDate.day,
      ]
    );

    const visitorCountByCountry = {};
    rows.forEach((row) => {
      visitorCountByCountry[row.country] = row.totalVisitors;
    });

    return visitorCountByCountry;
  } catch (error) {
    throw error;
  }
}

export async function AdultVisitors(startDate, endDate) {
  try {
    const [rows] = await db.query(
      "SELECT SUM(adults) as totalAdultVisitors FROM hotel WHERE (arrival_date_year > ? OR (arrival_date_year = ? AND arrival_date_month > ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month >= ?)) AND (arrival_date_year < ? OR (arrival_date_year = ? AND arrival_date_month < ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month <= ?))",
      [
        startDate.year,
        startDate.year,
        startDate.month,
        startDate.year,
        startDate.month,
        startDate.day,
        endDate.year,
        endDate.year,
        endDate.month,
        endDate.year,
        endDate.month,
        endDate.day,
      ]
    );

    const totalAdultVisitors = rows[0].totalAdultVisitors;

    return totalAdultVisitors;
  } catch (error) {
    throw error;
  }
}

export async function ChildrenVisitors(startDate, endDate) {
  try {
    const [rows] = await db.query(
      "SELECT SUM(children) as totalChildrenVisitors FROM hotel WHERE (arrival_date_year > ? OR (arrival_date_year = ? AND arrival_date_month > ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month >= ?)) AND (arrival_date_year < ? OR (arrival_date_year = ? AND arrival_date_month < ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month <= ?))",
      [
        startDate.year,
        startDate.year,
        startDate.month,
        startDate.year,
        startDate.month,
        startDate.day,
        endDate.year,
        endDate.year,
        endDate.month,
        endDate.year,
        endDate.month,
        endDate.day,
      ]
    );

    const totalChildrenVisitors = rows[0].totalChildrenVisitors;

    return totalChildrenVisitors;
  } catch (error) {
    throw error;
  }
}

export async function AdultVisitorsByDate(startDate, endDate) {
  try {
    const [rows] = await db.query(
      "SELECT arrival_date_year, arrival_date_month, arrival_date_day_of_month, SUM(adults) as adultCount FROM hotel WHERE (arrival_date_year > ? OR (arrival_date_year = ? AND arrival_date_month > ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month >= ?)) AND (arrival_date_year < ? OR (arrival_date_year = ? AND arrival_date_month < ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month <= ?)) GROUP BY arrival_date_year, arrival_date_month, arrival_date_day_of_month",
      [
        startDate.year,
        startDate.year,
        startDate.month,
        startDate.year,
        startDate.month,
        startDate.day,
        endDate.year,
        endDate.year,
        endDate.month,
        endDate.year,
        endDate.month,
        endDate.day,
      ]
    );

    const adultCountByDate = {};
    rows.forEach((row) => {
      const dateKey = `${row.arrival_date_year}-${row.arrival_date_month}-${row.arrival_date_day_of_month}`;
      adultCountByDate[dateKey] = row.adultCount;
    });

    return adultCountByDate;
  } catch (error) {
    throw error;
  }
}

export async function getChildVisitorsByDate(startDate, endDate) {
  try {
    const [rows] = await db.query(
      "SELECT arrival_date_year, arrival_date_month, arrival_date_day_of_month, SUM(children) as childCount FROM hotel WHERE (arrival_date_year > ? OR (arrival_date_year = ? AND arrival_date_month > ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month >= ?)) AND (arrival_date_year < ? OR (arrival_date_year = ? AND arrival_date_month < ?) OR (arrival_date_year = ? AND arrival_date_month = ? AND arrival_date_day_of_month <= ?)) GROUP BY arrival_date_year, arrival_date_month, arrival_date_day_of_month",
      [
        startDate.year,
        startDate.year,
        startDate.month,
        startDate.year,
        startDate.month,
        startDate.day,
        endDate.year,
        endDate.year,
        endDate.month,
        endDate.year,
        endDate.month,
        endDate.day,
      ]
    );

    const childCountByDate = {};
    rows.forEach((row) => {
      const dateKey = `${row.arrival_date_year}-${row.arrival_date_month}-${row.arrival_date_day_of_month}`;
      childCountByDate[dateKey] = row.childCount;
    });

    return childCountByDate;
  } catch (error) {
    throw error;
  }
}
