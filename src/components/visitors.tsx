import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import axios from "axios";

type OverviewProps = {
  startDate: [number, string, number];
  endDate: [number, string, number];
};

export function Visitors({ startDate, endDate }: OverviewProps) {
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
        "http://localhost:8080/countryVisitors",
        {
          params,
        }
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
        name: "Visitors",
        data: chartData,
      },
    ],

    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: chartCategories,
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "";
        },
      },
    },
  };
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartOptions.series}
      type="bar"
    />
  );
}
