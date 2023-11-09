import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { CalendarDateRangePicker } from "./date-range-picker";
import { MainNav } from "./main-nav";
import { Total } from "./total";
import { Visitors } from "./visitors";
import { Search } from "./search";
import TeamSwitcher from "./team-switcher";
import { UserNav } from "./user-nav";
import { Adults } from "./adults";
import { Children } from "./children";

export default function DashboardPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2015, 6, 1),
    to: new Date(2015, 6, 30),
  });
  console.log(date);
  const [startDate, setStartDate] = React.useState<[number, string, number]>([
    2015,
    "July",
    1,
  ]);
  const [endDate, setEndDate] = React.useState<[number, string, number]>([
    2015,
    "July",
    31,
  ]);
  const onRateChange = (newDate: DateRange) => {
    setDate(newDate);
  };

  React.useEffect(() => {
    if (date?.from && date?.to) {
      const startYear = date.from.getFullYear();
      const startMonth = date.from.toLocaleString("default", { month: "long" });
      const Date2 = date.from.getDate();

      const endYear = date.to.getFullYear();
      const endMonth = date.to.toLocaleString("default", { month: "long" });
      const endDate = date.to.getDate();

      const start: [number, string, number] = [startYear, startMonth, Date2];
      console.log(start);
      const end: [number, string, number] = [endYear, endMonth, endDate];
      console.log(end);
      setStartDate(start);
      setEndDate(end);
    }
  }, [date]);

  console.log(startDate);
  console.log(endDate);

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <img
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker
                date={date || { from: new Date(), to: new Date() }}
                onDateChange={onRateChange}
              />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Visitors
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2228</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Number of Countries
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+31</div>
                    <p className="text-xs text-muted-foreground">Countries</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="row-span-2">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Number of visitors per day</CardTitle>
                    <CardDescription>
                      Total number of adults children and babies visitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {startDate && endDate && (
                      <Total startDate={startDate} endDate={endDate} />
                    )}
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Number of visitors per country</CardTitle>
                    <CardDescription>
                      Total number of visitors from each country
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Visitors startDate={startDate} endDate={endDate} />
                  </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Total number of adult visitors</CardTitle>
                      <CardDescription>
                        Total number of adult visitors from each country
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Adults startDate={startDate} endDate={endDate} />
                    </CardContent>
                  </Card>
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Total number of children visitors</CardTitle>
                      <CardDescription>
                        Total number of children visitors from each country
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Children startDate={startDate} endDate={endDate} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
