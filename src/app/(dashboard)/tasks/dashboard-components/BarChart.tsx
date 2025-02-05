"use client"
import React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ITaskStats } from "@/lib/types"

const chartConfig = {
  tasks: {
    label: "Task",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const BarChartt = ({ data }: { data: ITaskStats }) => {
  const chartData = [
    {
      task: "Open",
      tasks: data?.stats?.open*10,
      fill: "hsl(var(--chart-4))",
    },
    {
      task: "In Progress",
      tasks: data?.stats?.inProgress * 10,
      fill: "hsl(var(--chart-3))",
    },
    {
      task: "Completed",
      tasks: data?.stats?.completed * 10,
      fill: "hsl(var(--chart-2))",
    },
    {
      task: "Overdue",
      tasks: data?.stats?.overdue * 10,
      fill: "hsl(var(--chart-1))",
    },
  ]
  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-0 text-[0.7rem] text-center mb-4">
        <CardTitle className=" text-[1rem]">Bar Chart Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="task"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />
            <Bar
              dataKey="tasks"
              fill="var(--color-tasks)"
              radius={8}
              accentHeight={70}
              height={20}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className=" text-center text-sm mt-5 flex items-center justify-center">
        <div className="leading-none text-muted-foreground space-y-1">
          <p> A Bar Chart showing task overview</p>
          <p className=" text-[0.7rem] font-semibold">
            Bar-Count: (Task) multiplied by 10
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BarChartt
