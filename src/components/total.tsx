import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import axios from "axios";

type OverviewProps = {
  startDate: [number, string, number];
  endDate: [number, string, number];
};

export function Total({ startDate, endDate }: OverviewProps) {
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
      const response = await axios.get("http://localhost:8080/totalVisitors", {
        params,
      });
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
    chart: {
      type: "area",
      stacked: false,
      height: 150,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
      width: "50%",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 1,
        right: 1,
        top: 0,
      },
    },
    series: [
      {
        name: "New users",
        data: chartData,
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: chartCategories,
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
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
