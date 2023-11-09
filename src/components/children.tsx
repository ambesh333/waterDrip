import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import axios from "axios";

type OverviewProps = {
  startDate: [number, string, number];
  endDate: [number, string, number];
};

export function Children({ startDate, endDate }: OverviewProps) {
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartCategories, setChartCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);
  const fetchData = async () => {
    console.log(startDate);
    console.log(endDate);
    const [startYear, startMonth, startDay] = startDate;
    const [endYear, endMonth, endDay] = endDate;

    try {
      const params = {
        startYear,
        startMonth,
        startDay,
        endYear,
        endMonth,
        endDay,
      };
      const response = await axios.get(
        "http://localhost:8080/getChildVisitorsByDate",
        { params }
      );
      const responseData = response.data;
      console.log(responseData);
      const keysArray = [];
      const valuesArray = [];
      for (const key in responseData) {
        keysArray.push(key);
        valuesArray.push(parseInt(responseData[key]));
      }
      setChartData(valuesArray);
      setChartCategories(keysArray);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const chartOptions: ApexOptions = {
    series: [
      {
        data: chartData,
      },
    ],
    chart: {
      type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ["#DCE6EC"],
    title: {
      text: "Children",
      offsetX: 0,
      style: {
        fontSize: "24px",
      },
    },
  };

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartOptions.series}
      type="area"
    />
  );
}
